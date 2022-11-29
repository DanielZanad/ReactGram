import "./EditProfile.css";

// Utils
import { upload } from "../../utils/config";

// Hooks
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Redux
import { profile, updateProfile, resetMessage } from "../../slices/userSlice";

// Components
import Message from "../../components/Message";


const EditProfile = () => {
  const dispatch = useDispatch();

  const { user, message, error, loading } = useSelector((state) => state.user);


  // States
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [bio, setBio] = useState("");
  const [previewImage, setPreviewImage] = useState("");

  // Load user data
  useEffect(() => {
    dispatch(profile());
  }, [dispatch]);

  // Fill form with user data
  useEffect(() => {

    if (user) {
      console.log(user.name);
      setName("walter");
      setEmail(user.email);
      setBio(user.bio);
    }

  }, [user]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    // Getter user data from states
    const userData = {
      name
    }

    if (profileImage) {
      userData.profileImage = profileImage;
    }

    if (bio) {
      userData.bio = bio;
    }

    if (password) {
      userData.password = password;
    }

    // build form data
    const formData = new FormData();

    const userFormData = Object.keys(userData).forEach(key => formData.append(key, userData[key]));

    formData.append("user", userFormData);

    console.log(userFormData);

    await dispatch(updateProfile(formData));

    setTimeout(() => {
      dispatch(resetMessage());
    }, 2000);
  }

  const handleFile = (e) => {
    // Image preview 
    const image = e.target.files[0];

    setPreviewImage(image);

    // Update image state
    setProfileImage(image);
  }

  return (
    <div id="edit-profile">
      <h2>Edite seus dados</h2>
      <p className="subtitle">Adiciona uma imagem de perfile e conte mais sobre voce...</p>
      {(user.profileImage || previewImage) && (
        <img
          className="profile-image"
          src={
            previewImage ? URL.createObjectURL(previewImage) : `${upload}/users/${user.profileImage}`
          } alt={user.name} />
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nome"
          onChange={(e) => setName(e.target.value)}
          value={name || ""}
        />
        <input type="email" placeholder="Email" disabled value={email || ""} />
        <label>
          <span>Imagem do perfil: </span>
          <input type="file" onChange={handleFile} />
        </label>
        <label>
          <span>Bio: </span>
          <input type="text" placeholder="Descricao do perfil" onChange={(e) => setBio(e.target.value)} value={bio || ""} />
        </label>
        <label>
          <span>Quer alterar sua senha?</span>
          <input type="password" placeholder="Digite sua nova senha" onChange={(e) => setPassword(e.target.value)} value={password || ""} />
        </label>
        {!loading && <input type="submit" value="Atualizar" />}
        {loading && <input type="submit" value="Aguarde..." disabled />}
        {error && <Message msg={error} type="error" />}
        {message && <Message msg={message} type="success" />}
      </form>
    </div>
  )
}

export default EditProfile