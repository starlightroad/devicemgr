"use client";

import { CheckIcon, CopyIcon, Share2Icon } from "lucide-react";

import { Label, Modal, Surface } from "@heroui/react";

import type { BaseDeviceModalProps } from "@/features/device/lib/definitions";

import useTimer from "@/features/dashboard/hooks/use-timer";

import useCopyToClipboard from "@/features/device/hooks/use-copy-to-clipboard";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";

import { Field, FieldGroup } from "@/components/ui/field";

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
    <Modal isOpen onOpenChange={onClose}>
      <Button className="hidden">Move Device</Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-default text-foreground">
                <Share2Icon className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Share</Modal.Heading>
              <p className="text-muted mt-1.5_ text-sm leading-5">
                Anyone who has this link will be able to view this.
              </p>
            </Modal.Header>
            <Modal.Body className="px-1 py-4">
              <Surface variant="default">
                <FieldGroup>
                  <Field>
                    <Label className="sr-only">Share</Label>
                    <Input name="share" defaultValue={shareUrl} readOnly />
                  </Field>
                  <Button aria-label="Copy" size="icon-sm" variant="ghost" onClick={copyShareUrl}>
                    {isRunning ? <CheckIcon className="size-4" /> : <CopyIcon className="size-4" />}
                  </Button>
                </FieldGroup>
              </Surface>
            </Modal.Body>
            <Modal.Footer>
              <Button type="button" slot="close">
                Close
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
