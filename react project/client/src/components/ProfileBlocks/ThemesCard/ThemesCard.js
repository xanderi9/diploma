import React, { useState } from 'react';
import { Image } from 'react-bootstrap';
import styles from '../../ProfileBlocks/ProfileBlocks.module.css';
import more from '../../../img/more.png';
import ThemeListModal from '../../Modals/ThemeListModal/ThemeListModal';

const ThemesCard = ({ themes_list }) => {

  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const type_of_user = localStorage.getItem('type_of_user');
  const last_name = localStorage.getItem('last_name');
  const first_name = localStorage.getItem('first_name');
  const patronymic = localStorage.getItem('patronymic');

  const fullname = last_name + ' ' + first_name + ' ' + patronymic;

  let Themes = themes_list

  const themesToShow = Themes.slice(0, 3).map(row => row.name);

  return (
    <div className={styles.card}>
      <p className="text-center px-1 py-2 fw-bold">Список тем</p>
      <div>
        {themesToShow.map((theme, index) => (
          <div key={index} className='my-2'>{theme}</div>
        ))}
      </div>
      <Image src={more} className={styles.more} onClick={handleShowModal} alt="profile_pic" loading="lazy" />
      {showModal && <ThemeListModal show={true} themes_list={Themes} fullname={fullname} handleClose={handleCloseModal} type_of_user={type_of_user} />}
    </div>
  );
};

export default ThemesCard;
