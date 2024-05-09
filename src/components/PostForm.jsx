import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import storageService from "../services/storage";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Input from "./Input";
import { RTE, Select, Button } from "./index";

function PostForm({ post }) {
  const navigate = useNavigate();
  const { handleSubmit, register, watch, setValue, getValues, control } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const userData = useSelector((state) => state.auth.userData);

  const create = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await storageService.uploadFile(data.image[0])
        : null;
      if (file) {
        await storageService.deleteFile(post.featured_img);
      }
      const updatedPost = await storageService.updateDocument(post.$id, {
        ...data,
        featured_img: file ? file.$id : undefined,
      });
      if (updatedPost) {
        navigate(`/post/${updatedPost.$id}`);
      }
    } else {
      const file = data.image[0]
        ? storageService.uploadFile(data.image[0])
        : undefined;
      if (file) {
        data.featured_img = file.$id;
        const newPost = await storageService.createDocument({
          ...data,
          userID: userData.$id,
        });
        if (newPost) {
          navigate(`/post/${newPost.$id}`);
        }
      }
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), {
          shouldValidate: true,
        });
      }
      return () => subscription.unsubscribe();
    });
  }, [watch, setValue, slugTransform]);

  return (
    <form onSubmit={handleSubmit(create)}>
      <div className="w-2/3 px-2">
        <Input
          label={"title"}
          placeholder="Title"
          name="title"
          className="mb-4"
          {...register("title", {
            required: true,
          })}
        />
        <Input
          label={"slug"}
          placeholder={"slug"}
          name="slug"
          className="mb-4"
          {...register("slug", {
            required: true,
          })}
          onInput={(e) =>
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            })
          }
        />
        <RTE
          label={"Content :"}
          name={"content"}
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          name="file"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featured_img)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          label="Status"
          options={["active", "inactive"]}
          className="mb-4"
          name="status"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          name="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full max-w-max px-4 py-2"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
