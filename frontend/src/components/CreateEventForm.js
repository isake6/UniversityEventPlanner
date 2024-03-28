import React from 'react';

const CreateEventForm = () => {
  return (
    <div>
      <button class="btn" onclick="my_modal_3.showModal()">
        open modal
      </button>
      <dialog id="my_modal_3" class="modal">
        <div class="modal-box">
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"></button>
          </form>
          <h3 class="font-bold text-lg">Hello!</h3>
          <p class="py-4">Press ESC key or click on ✕ button to close</p>
        </div>
      </dialog>
    </div>
  );
};

export default CreateEventForm;
