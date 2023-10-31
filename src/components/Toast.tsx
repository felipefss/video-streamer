import * as ToastLib from '@radix-ui/react-toast';
import { ExclamationTriangleIcon, CheckCircledIcon } from '@radix-ui/react-icons';

type ToastType = 'error' | 'success';

interface Props {
  message: string | null;
  type: ToastType;
  isVisible: boolean;
}

export function Toast({ message, type, isVisible }: Props) {
  return (
    <ToastLib.Provider>
      <ToastLib.Root open={isVisible} className="bg-indigo-950 rounded-md p-3 text-sm">
        <ToastLib.Description className="flex items-center gap-2"></ToastLib.Description>
      </ToastLib.Root>
      {type === 'error' ? (
        <>
          <ExclamationTriangleIcon color="#e01b1b" />
          <span>Something went wrong</span>
        </>
      ) : (
        <>
          <CheckCircledIcon color="#207b26" />
          <span>{message ?? 'Operation was successful'}</span>
        </>
      )}
      <ToastLib.Viewport className="fixed top-0 right-0 mr-6 mt-12" />
    </ToastLib.Provider>
  );
}
