import React from 'react';

import Header from '../../components/Header';
import TeacherItem from '../../components/TeacherItem';

import './styles.css';

const sampleTeacher = {
  name: 'Diego Fernandes',
  subject: 'Química',
  description:
    'Entusiasta das melhores tecnologias de química avançada.Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.',
  price: 'R$40,00',
  avatar_url:
    'https://avatars2.githubusercontent.com/u/2254731?s=460&u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&v=4',
};

const TeacherList: React.FC = () => {
  return (
    <div id="page-teacher-list" className="container">
      <Header title="Esses são os proffys disponiveis:">
        <form id="search-teachers">
          <div className="input-block">
            <label htmlFor="subject">Matéria</label>
            <input type="text" id="subject" autoComplete="off" />
          </div>

          <div className="input-block">
            <label htmlFor="week-day">Dia da semana</label>
            <input type="text" id="week-day" autoComplete="off" />
          </div>

          <div className="input-block">
            <label htmlFor="time">Hora</label>
            <input type="text" id="time" autoComplete="off" />
          </div>
        </form>
      </Header>
      <main>
        <TeacherItem teacher={sampleTeacher} />
        <TeacherItem teacher={sampleTeacher} />
        <TeacherItem teacher={sampleTeacher} />
        <TeacherItem teacher={sampleTeacher} />
        <TeacherItem teacher={sampleTeacher} />
      </main>
    </div>
  );
};

export default TeacherList;
