import React from 'react';

import whatsappIcon from '../../assets/icons/whatsapp.svg';

import './styles.css';
import api from '../../services/api';

interface Teacher {
  id: number;
  name: string;
  avatar: string;
  subject: string;
  description: string;
  price: number;
  whatsapp: string;
}

interface TeacherItemProps {
  teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
  async function createNewConnection() {
    api.post('/connections', {
      user_id: teacher.id,
    });
  }

  return (
    <article className="teacher-item">
      <header>
        <img src={teacher.avatar} alt={teacher.name} />
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
        <a
          href={`https://wa.me/${teacher.whatsapp}`}
          target="_blank"
          onClick={createNewConnection}
        >
          <img src={whatsappIcon} alt="Whatsapp" />
          Entrar em contato
        </a>
      </footer>
    </article>
  );
};

export default TeacherItem;
