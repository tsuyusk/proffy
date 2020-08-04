import React from 'react';

import whatsappIcon from '../../assets/icons/whatsapp.svg';

import './styles.css';

interface Teacher {
  name: string;
  avatar_url: string;
  subject: string;
  description: string;
  price: string;
}

interface TeacherItemProps {
  teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar_url} alt={teacher.name} />
        <div>
          <strong>{teacher.name}</strong>
          <span>{teacher.subject}</span>
        </div>
      </header>

      <p>{teacher.description}</p>

      <footer>
        <p>
          Preço/hora
          <strong>{teacher.price}</strong>
        </p>
        <button>
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </button>
      </footer>
    </article>
  );
};

export default TeacherItem;
