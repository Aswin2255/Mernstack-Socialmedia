import React, { useState } from 'react'
import './table.css'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'

function Table() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  return (
    <div className='table-container'>
        <div className='heading'>
        <h1 className='text-6xl mb-4  text-gray-400  text-center justify-center m-4'>Post Management</h1>
        </div>
        <table class="shadow-lg bg-white border-separate m-4">
  <tr>
    <th class="bg-blue-100 border text-left px-8 py-4">Username</th>
    <th class="bg-blue-100 border text-left px-8 py-4">Reson for report</th>
    <th class="bg-blue-100 border text-left px-8 py-4"></th>
    <th class="bg-blue-100 border text-left px-8 py-4"></th>
  </tr>
  <tr>
    <td class="border px-8 py-4">Alfreds Futterkiste</td>
    <td class="border px-8 py-4">Dante Sparks</td>
    <td class="border px-8 py-4"><a href=''>See post</a></td>
    <td class="border px-8 py-4"><button className='bg-red-500 text-white  md:px-6 py-1 rounded-md'>Take action</button></td>
  </tr>
  <tr>
    <td class="border px-8 py-4">Centro comercial Moctezuma</td>
    <td class="border px-8 py-4">Neal Garrison</td>
    <td class="border px-8 py-4"><a href=''>See post</a></td>
    <td class="border px-8 py-4"> <button className='bg-red-500 text-white  md:px-6 py-1 rounded-md'>Take action</button></td>
  </tr>
  <tr>
    <td class="border px-8 py-4"><button>Take action</button></td>
    <td class="border px-8 py-4">Maggie O'Neill</td>
    <td class="border px-8 py-4"><a href=''>See post</a></td>
    <td class="border px-8 py-4"> <button className='bg-red-500 text-white  md:px-6 py-1 rounded-md'>Take action</button></td>
  </tr>
</table>
<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Table
