import { useEffect } from 'react';
import '../styles/modal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onHide?: () => void; // 🔧 Fix: Accept optional onHide
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export default function Modal({ show, onClose, onHide, title, children, footer }: ModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onHide?.(); // 🔧 Trigger onHide if defined
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose, onHide]);

  if (!show) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-content">
        {/* Modal Header */}
        {title && (
          <div className="modal-header">
            <h2 className="modal-title">{title}</h2>
            <FontAwesomeIcon
              icon={faTimes}
              className="fa-icon fa-modal-icon"
              title="Close"
              onClick={() => {
                onHide?.(); // 🔧 Call onHide before onClose
                onClose();
              }}
            />
          </div>
        )}

        {/* Modal Body */}
        <div className="modal-body">
          {children}
        </div>

        {/* Modal Footer */}
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  );
}
