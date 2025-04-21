import { useEffect } from 'react';
import '../styles/modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';  // Import the close icon

interface ModalProps {
  show: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export default function Modal({ show, onClose, title, children, footer }: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!show) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-content">
        
        {/* Modal Header */}
        {title && (
          <div className="modal-header">
            <h2 className="modal-title">{title}</h2>
            {/* Close Icon */}
            <FontAwesomeIcon
              icon={faTimes}
              className="fa-icon fa-modal-icon"
              title="Close"
              onClick={onClose}  // Close functionality
            />
          </div>
        )}

        {/* Modal Body (where the actual content goes) */}
        <div className="modal-body">
          {children}
        </div>

        {/* Modal Footer (optional content like buttons) */}
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}
