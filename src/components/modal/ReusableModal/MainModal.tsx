// components/ModalComponent.tsx
import React, { ReactNode } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/button";

interface ModalComponentProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  children: ReactNode;
  footerContent?: ReactNode;
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "full";
  isDismissable?: boolean;
  isKeyboardDismissDisabled?: boolean;
  placement?:
    | "auto"
    | "top"
    | "bottom"
    | "center"
    | "top-center"
    | "bottom-center";
}

const MainModal = ({
  isOpen,
  onOpenChange,
  title,
  children,
  footerContent,
  size = "2xl",
  isDismissable = true,
  isKeyboardDismissDisabled = false,
  placement,
}: ModalComponentProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size={size}
      backdrop={"blur"}
      className="bg-[#18181B]"
      isDismissable={isDismissable}
      isKeyboardDismissDisabled={isKeyboardDismissDisabled}
      scrollBehavior={"inside"}
      placement={placement}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.4,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.3,
              ease: "easeIn",
            },
          },
        },
      }}
    >
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        {/* React.cloneElement is used to add an onClose prop to the children, allowing it to use the onOpenChange function for closing the modal. */}
        <ModalBody>
          {React.cloneElement(children as React.ReactElement, {
            onClose: () => onOpenChange(false),
          })}
        </ModalBody>
        <ModalFooter>
          {footerContent || (
            <>
              <Button
                variant="light"
                color="primary"
                onPress={() => onOpenChange(false)}
              >
                Close
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MainModal;
