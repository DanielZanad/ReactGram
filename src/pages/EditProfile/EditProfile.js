import React from 'react'

import "./EditProfile.css";

const EditProfile = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div id="edit-profile">
      <h2>Edite seus dados</h2>
      <p className="subtitle">Adiciona uma imagem de perfile e conte mais sobre voce...</p>
      {/** Preview da imagem */}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nome" />
        <input type="email" placeholder="Email" disabled />
        <label>
          <span>Imagem do perfil: </span>
          <input type="file" />
        </label>
        <label>
          <span>Bio: </span>
          <input type="text" placeholder="Descricao do perfil" />
        </label>
        <label>
          <span>Quer alterar sua senha?</span>
          <input type="password" placeholder="Digite sua nova senha" />
        </label>
        <input type="submit" value="Atualizar" />
      </form>
    </div>
  )
}

export default EditProfile