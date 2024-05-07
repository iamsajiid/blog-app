import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import storageService from "../services/storage";
import { useForm } from "react-hook-form";
import { useSelector } from "@reduxjs/toolkit";
import Input from "./Input";

function PostForm({ post }) {
  const navigate = useNavigate();
  const { register, watch, setValue, getValues } = useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "",
        content: post?.content || "",
        status: post?.status || "active",
      }
    }
  );
  
  const userData = useSelector((state) => state.auth.userData);

  const create = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await storageService.uploadFile(data.image[0])
        : null;
      if (file) {
        await storageService.deleteFile(post.featuredImage);
      }
      const updatedPost = await storageService.updateDocument(post.$id, {
        ...data,
        featuredImage: file ? file.$id : undefined,
      });
      if (updatedPost) {
        navigate(`/post/${updatedPost.$id}`);
      }
    } else {
      const file = data.image[0]
        ? storageService.uploadFile(data.image[0])
        : null;
      if (file) {
        data.featuredImage = file.$id;
        const newPost = await storageService.createDocument({
          ...data,
          userID: userData.$id,
        });
        if (newPost) {
          navigate(`/post/${newPost.$id}`);
        }
      }
    }

    const slugTransform = useCallback((value) => {
      if (value && typeof value === "string")
        return value
          .trim()
          .toLowerCase()
          .replace(/[^a-zA-Z\d\s]+/g, "-")
          .replace(/\s/g, "-");

      return "";
    });

    useEffect(() => {
      const subscription = watch((value, { name }) => {
        if (name === "title") {
          setValue("slug", slugTransform(value.title), {
            shouldValidate: true,
          });
        }
        return () => subscription.unsubscribe();
      });
    }, [slugTransform, watch, setValue]);
  };

  return (
    <form onSubmit={handleSubmit(create)}>
      <div className="w-2/3 px-2">
        <Input
          label={title}
          placeholder="Title"
          className="mb-4"
          {...register("title", {
            required: true,
          })}
        />
        <Input
          label={slug}
          placeholder="slug"
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
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <Input
          label="Featured Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="mb-4"
          {...register("status", { required: true })}
        />
        <Button
          type="submit"
          bgColor={post ? "bg-green-500" : undefined}
          className="w-full"
        >
          {post ? "Update" : "Submit"}
        </Button>
      </div>
    </form>
  );
}

export default PostForm;
