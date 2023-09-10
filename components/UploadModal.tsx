"use client";

import uniqid from "uniqid";
import React, { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import useUploadModal from '@/hooks/useUploadModal';
import { useUser } from "@/hooks/useUser";

import Modal from './Modal';
import Input from './Input';
import Button from './Button';

const UploadModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const uploadModal = useUploadModal();
  const supabaseClient = useSupabaseClient();
  const { user } = useUser();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      category: '',
      title: '',
      sound: null,
      image: null,
    }
  });

  const onChange = (open: boolean) => {
    if (!open) {
      reset();
      uploadModal.onClose();
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true);
      
      const imageFile = values.image?.[0];
      const soundFile = values.sound?.[0];

      if (!imageFile || !soundFile || !user) {
        toast.error('Missing fields')
        return;
      }

      const uniqueID = uniqid();

      // Upload Sound
      const { 
        data: soundData, 
        error: soundError 
      } = await supabaseClient
        .storage
        .from('sounds')
        .upload(`sound-${values.title}-${uniqueID}`, soundFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (soundError) {
        setIsLoading(false);
        return toast.error('Failed sound upload');
      }

      // Upload image
      const { 
        data: imageData, 
        error: imageError
      } = await supabaseClient
        .storage
        .from('images')
        .upload(`image-${values.title}-${uniqueID}`, imageFile, {
          cacheControl: '3600',
          upsert: false
        });

      if (imageError) {
        setIsLoading(false);
        return toast.error('Failed image upload');
      }

      
      // Create record 
      const { error: supabaseError } = await supabaseClient
        .from('sounds')
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          category: values.category,
          image_path: imageData.path,
          sound_path: soundData.path
        });

      if (supabaseError) {
        return toast.error(supabaseError.message);
      }
      
      router.refresh();
      setIsLoading(false);
      toast.success('Sound created successfully!');
      reset();
      uploadModal.onClose();
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal
      title="Add Sounds"
      description="Upload an mp3 file"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="flex flex-col gap-y-4"
      >
        <Input
          id="title"
          disabled={isLoading}
          {...register('title', { required: true })}
          placeholder="Sound Title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register('author', { required: true })}
          placeholder="Sound Author"
        />
        <Input
          id="category"
          disabled={isLoading}
          {...register('category', { required: true })}
          placeholder="Sound Category"
        />
        <div>
          <div className="pb-1">
            Select a sound file
          </div>
          <Input
            placeholder="test" 
            disabled={isLoading}
            type="file"
            accept=".mp3"
            id="sound"
            {...register('sound', { required: true })}
          />
        </div>
        <div>
          <div className="pb-1">
            Select an image
          </div>
          <Input
            placeholder="test" 
            disabled={isLoading}
            type="file"
            accept="image/*"
            id="image"
            {...register('image', { required: true })}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
}

export default UploadModal;