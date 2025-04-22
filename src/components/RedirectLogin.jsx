import { useEffect, useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { BounceLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

export default function RedirectLogin() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(false);
      navigate('/login'); // Redirect to login after delay
    }, 2000); // Adjust delay time (2000ms = 2 seconds)

    return () => clearTimeout(timer); // Cleanup timeout on unmount
  }, [navigate]);

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/50 transition-opacity" />

      <div className="fixed inset-0 z-10 flex items-center justify-center">
        <DialogPanel className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-gray-800 text-lg mb-4">Redirecting to login...</p>
          <BounceLoader color="#4F46E5" />
        </DialogPanel>
      </div>
    </Dialog>
  );
}
