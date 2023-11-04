import Swal from 'sweetalert2'

export async function showSuccessDialog(title, text) {
  await Swal.fire({
    title: title,
    text: text,
    confirmButtonColor: '#00d1b2',
    icon: 'success',
    confirmButtonText: 'OK'
  })
}

export async function showErrorDialog(title, text) {
  await Swal.fire({
    title: title,
    text: text,
    confirmButtonColor: '#00d1b2',
    icon: 'error',
    confirmButtonText: 'OK'
  })
}

export async function showConfirmationDialog(title, text, callback) {
  await Swal.fire({
    title: title,
    text: text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'OK',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      callback()
    }
  })
}
