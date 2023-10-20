'use client';

import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import { TextField } from '@radix-ui/themes';

interface Props {
  className?: string;
}

export function SearchInput({ className }: Props) {
  return (
    <form className={className}>
      <TextField.Root>
        <TextField.Slot>
          <MagnifyingGlassIcon />
        </TextField.Slot>
        <TextField.Input placeholder="Search for a video..." />
      </TextField.Root>
    </form>
  );
}
