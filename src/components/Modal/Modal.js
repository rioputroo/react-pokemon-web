import React, { useState } from 'react';

import './Modal.css';

function Modal(props) {
  const [nicknameState, setNicknameState] = useState('');

  const cssClasses = ['Modal', props.show ? 'ModalOpen' : 'ModalClosed'];

  return (
    <div className={cssClasses.join(' ')}>
      <h4>{props.message.msg}</h4>
      {props.message.status === true ? (
        <input
          type="text"
          className="InputNickname"
          value={nicknameState}
          onChange={(event) => setNicknameState(event.target.value)}
        />
      ) : null}
      <button className="Button" onClick={() => props.closed(nicknameState)}>
        Ok
      </button>
    </div>
  );
}

export default Modal;
