'use client';

import { Button, Dialog, Flex, Text, TextField } from '@radix-ui/themes';
import { FormEvent, ReactNode, useRef, useState } from 'react';
import { ThreeCircles } from 'react-loader-spinner';

interface Props {
  children: ReactNode;
}

export function UploadFileDialog({ children }: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputFileRef = useRef<HTMLInputElement>(null);
  const fileNameRef = useRef<HTMLInputElement>(null);

  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!inputFileRef.current?.files || !inputFileRef.current.files.length) {
      alert('No file chosen');
      return;
    }

    const file = inputFileRef.current.files[0];
    const fileName = fileNameRef.current?.value;
    const generatedFileName = new Date().getTime() + '';

    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName ?? generatedFileName);

    try {
      setIsSubmitting(true);
      const response = await fetch('/api/video', {
        method: 'POST',
        body: formData,
      });

      setIsSubmitting(false);
      setIsDialogOpen(false);

      if (!response.ok) {
        console.error('Something went wrong');
        return;
      }

      console.log(response);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Dialog.Trigger>{children}</Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>Upload Video</Dialog.Title>
        <Dialog.Description>Select a video to be uploaded</Dialog.Description>

        <form onSubmit={handleFormSubmit} className="mt-4">
          <Flex direction="column" gap="4">
            <div>
              <Text as="label" className="mb-5">
                File name:
              </Text>
              <TextField.Root className="mt-1">
                <TextField.Input placeholder="Type a name for the file to be uploaded" ref={fileNameRef} required />
              </TextField.Root>
            </div>
            <input type="file" name="file" ref={inputFileRef} required />

            {isSubmitting && (
              <div className="self-center">
                <ThreeCircles height="32" width="32" color="#fff" />
              </div>
            )}
          </Flex>
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray" className="bg-[--accent-a3] cursor-pointer hover:opacity-80">
                Cancel
              </Button>
            </Dialog.Close>
            <Button type="submit" className="bg-[--accent-9] cursor-pointer hover:opacity-80">
              Upload
            </Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
