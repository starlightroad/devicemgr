"use client";

import { CheckIcon, CopyIcon } from "lucide-react";

import type { BaseDeviceModalProps } from "@/features/device/lib/definitions";

import useTimer from "@/features/dashboard/hooks/use-timer";

import useCopyToClipboard from "@/features/device/hooks/use-copy-to-clipboard";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const getUrlProtocolAndDomain = () => {
  const { protocol, host } = window.location;
  return `${protocol}//${host}`;
};

type ShareDeviceModalProps = BaseDeviceModalProps;

export default function ShareDeviceModal({ deviceId, onClose }: ShareDeviceModalProps) {
  const { copy } = useCopyToClipboard();

  const { isRunning, startTimer } = useTimer();

  const shareUrl = `${getUrlProtocolAndDomain()}/devices/${deviceId}`;

  const copyShareUrl = async () => {
    await copy(shareUrl);
    startTimer();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogTrigger hidden>Share Device</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share</DialogTitle>
          <DialogDescription>Anyone who has this link will be able to view this.</DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="share" className="sr-only">
              Share
            </FieldLabel>
            <Input id="share" defaultValue={shareUrl} readOnly />
          </Field>
          <Button aria-label="Copy" size="icon-sm" variant="ghost" onClick={copyShareUrl}>
            {isRunning ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
          </Button>
        </FieldGroup>
        <DialogFooter>
          <DialogClose render={<Button type="button">Close</Button>}></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
