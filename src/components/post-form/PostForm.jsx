import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import appwriteService from "../../appwrite/appwriteConfig";
import Button from "../Button";
import Input from "../Input";
import Select from "../Select";
import RTE from "../RTE";

function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
    defaultValues: {
      title: post?.title || "",
      content: post?.content || "",
      status: post?.status || "active",
      slug: post?.slug || "",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  // Handle form submission
  const submit = async (data) => {
    //If post exists → We're editing an existing post.
    if (post) {
        //Uploads new image (if changed) and deletes the old one.
      const file = data.image[0] ? await appwriteService.uploadFile(data.image[0]) : null;
      if (file) {
        await appwriteService.deleteFile(post.featuredImage);
      }
      
      //Update the post with new data.
      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        featuredImage: file ? file.$id : post.featuredImage,
      });

      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }

    //  Else (creating a new post)
    } else {
        //Uploads image to Appwrite.
      const file = await appwriteService.uploadFile(data.image[0]);
      const dbPost = await appwriteService.createPost({
        ...data,
        featuredImage: file.$id,
        userId: userData.$id,
      });
      if (dbPost) {
        navigate(`/post/${dbPost.$id}`);
      }
    }
  };

  // Convert title to a URL-friendly slug
  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string") {
      return value.toLowerCase().replace(/\s+/g, "-");
    }
  }, []);

  // Automatically update slug when title changes
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });

    return () => subscription.unsubscribe(); // Prevent memory leak
  }, [watch, slugTransform, setValue]); // Dependency array
//  watch()	Watches for changes in the title field.
//setValue("slug", ...)	Automatically updates the slug field.
//subscription.unsubscribe()	Cleans up memory after unmounting.

  return (
    <form onSubmit={handleSubmit(submit)} className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
      {/* Main Form Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Side (Title, Slug, Content) */}
        <div className="md:col-span-2 space-y-4">
          <Input
            label="Title:"
            placeholder="Enter post title"
            {...register("title", { required: true })}
          />
          <Input
            label="Slug:"
            placeholder="Slug"
            {...register("slug", { required: true })}
            onInput={(e) => setValue("slug", slugTransform(e.target.value), { shouldValidate: true })}
          />
          <RTE
            label="Content:"
            name="content"
            control={control}
            defaultValue={getValues("content")}
          />
        </div>

        {/* Right Side (Image Upload, Status, Button) */}
        <div className="space-y-4">
          <Input
            label="Featured Image:"
            type="file"
            accept="image/*"
            {...register("image", { required: !post })}
          />
          {post && (
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="w-full h-48 object-cover rounded-lg shadow-md"
            />
          )}
          <Select
            options={["active", "inactive"]}
            label="Status:"
            {...register("status", { required: true })}
          />
          <Button type="submit" className="w-full">
            {post ? "Update Post" : "Create Post"}
          </Button>
        </div>
      </div>
    </form>
  );
}

export default PostForm;
