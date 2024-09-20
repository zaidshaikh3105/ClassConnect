import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, InputField, RTE, Select } from "../index"; // Assuming you have custom components
import appwriteService from "../../appwrite/config"; // Appwrite service config
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostNote({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.slug || "", // Use slug or post id if slug is not available
        content: post?.content || "",
        status: post?.status || "active", // Default status to "active"
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData); // Fetch user data from Redux

  const submit = async (data) => {
    let file = null;

    // Handle image upload logic
    if (data.image && data.image[0]) {
      file = await appwriteService.uploadFile(data.image[0]);
    }

    if (post) {
      // If post exists, update it
      if (file) {
        await appwriteService.deleteFile(post.image); // Delete old image if a new one is uploaded
      }

      const updatedPost = await appwriteService.updatePost(post.$id, {
        ...data,
        image: file ? file.$id : post.image, // Use new file id if available, otherwise keep the old one
      });

      if (updatedPost) {
        navigate(`/post/${updatedPost.$id}`); // Redirect to updated post
      }
    } else {
      // If post doesn't exist, create a new one
      if (file) {
        const fileId = file.$id;
        data.image = fileId;
      }

      const newPost = await appwriteService.createPost({
        ...data,
        userId: userData.$id, // Include the user ID
      });

      if (newPost) {
        navigate(`/post/${newPost.$id}`); // Redirect to the new post
      }
    }
  };

  // Slug transformation function
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "")
        .replace(/\s+/g, "-");
    }
    return "";
  }, []);

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
        <InputField
          label="Title :"
          placeholder="Title"
          className="mb-4"
          {...register("title", { required: true })}
        />
        <InputField
          label="Slug :"
          placeholder="Slug"
          className="mb-4"
          {...register("slug", { required: true })}
          onInput={(e) => {
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            });
          }}
        />
        <RTE
          label="Content :"
          name="content"
          control={control}
          defaultValue={getValues("content")}
        />
      </div>
      <div className="w-1/3 px-2">
        <InputField
          label="image Image :"
          type="file"
          className="mb-4"
          accept="image/png, image/jpg, image/jpeg, image/gif"
          {...register("image", { required: !post })}
        />
        {post && post.image && (
          <div className="w-full mb-4">
            <img
              src={appwriteService.getFilePreview(post.image)}
              alt={post.title}
              className="rounded-lg"
            />
          </div>
        )}
        <Select
          options={["active", "inactive"]}
          label="Status :"
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
