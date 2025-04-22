import { useEffect, isValidElement } from 'react';
import '../styles/modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Card from './card';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onHide?: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export default function Modal({ show, onClose, onHide, title, children, footer }: ModalProps) {
  const handleClose = () => {
    onHide?.();
    onClose();
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose, onHide]);

  if (!show) return null;

  // ✅ Infer title from child's modalTitle if not explicitly passed
  let resolvedTitle = title;
  if (!resolvedTitle && isValidElement(children)) {
    const modalTitle = (children.type as any)?.modalTitle;
    if (typeof modalTitle === 'string') {
      resolvedTitle = modalTitle;
    }
  }

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-content">
        <Card
          title={resolvedTitle}
          icons={
            <FontAwesomeIcon
              icon={faTimes}
              className="fa-icon"
              title="Close"
              onClick={handleClose}
            />
          }
        >
          {children}
        </Card>

        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}
