'use client';

import { Button, Dialog, Flex } from '@radix-ui/themes';
import { FormEvent, ReactNode, useRef } from 'react';

interface Props {
  children: ReactNode;
}

export function UploadFileDialog({ children }: Props) {
  const inputFileRef = useRef<HTMLInputElement>(null);

  async function handleFormSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!inputFileRef.current?.files || !inputFileRef.current.files.length) {
      alert('No file chosen');
      return;
    }

    const file = inputFileRef.current.files[0];

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/video', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        console.error('Something went wrong');
        return;
      }

      console.log(response.json());
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>Upload Video</Dialog.Title>
        <Dialog.Description>Select a video to be uploaded</Dialog.Description>

        <form onSubmit={handleFormSubmit}>
          <input type="file" name="file" ref={inputFileRef} required />
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray" className="bg-[--accent-a3] cursor-pointer hover:opacity-80">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button type="submit" className="bg-[--accent-9] cursor-pointer hover:opacity-80">
                Upload
              </Button>
            </Dialog.Close>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}
