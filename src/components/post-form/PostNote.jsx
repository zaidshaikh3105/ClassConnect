import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, InputField, RTE, Select } from "../index";
import service from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PostNote({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post?.title || "",
        slug: post?.$id || "",
        content: post?.content || "",
        status: post?.status || "active",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (!userData) {
      console.error("User data is not available");
      return; // Handle the error appropriately
    }

    console.log("post notes:::", userData);

    let fileId = post?.image || ""; // Default to existing image if present

    if (data.image && data.image[0]) {
      const file = await service.uploadFile(data.image[0]);
      fileId = file?.$id; // Get the file ID from the upload
    }

    if (post) {
      if (fileId && post.image && fileId !== post.image) {
        // Delete the old image if it's being replaced
        await service.deleteFile(post.image);
      }

      const dbPost = await service.updateNotes(post.$id, {
        ...data,
        image: fileId, // Use the new or old image
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    } else {
      const dbPost = await service.createNotes({
        slug: data.slug,
        content: data.content,
        image: fileId || "", // Pass the file ID or empty string
        title: data.title,
        status: data.status,
        userId: userData.$id, // Ensure this is set correctly
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    }
  };

  // Slug transformation function with debounce-like behavior
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
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
    <div className="p-2">
      <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
        <div className="w-2/3 px-2">
          <InputField
            label="Title:"
            placeholder="Title"
            className="mb-4 input input-bordered text-white border-white focus:border-white focus:ring-white"
            {...register("title", { required: "title is Required" })}
          />
          <InputField
            label="Slug:"
            placeholder="Slug"
            className="mb-4 input input-bordered text-white border-white focus:border-white focus:ring-white"
            {...register("slug", { required: true })}
            onInput={(e) => {
              setValue("slug", slugTransform(e.currentTarget.value), {
                shouldValidate: true,
              });
            }}
            disabled
          />
          <RTE
            label="Content:"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>
        <div className="w-1/3 px-2">
          <InputField
            label="Image:"
            type="file"
            className="mb-4 input input-bordered text-white border-white focus:border-white focus:ring-white"
            accept="image/png, image/jpg, image/jpeg, image/gif"
            {...register("image", { required: !post?.image })}
          />
          {post && post.image && (
            <div className="w-full mb-4">
              <img
                src={service.getFilePreview(post.image)}
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
    </div>
  );
}
