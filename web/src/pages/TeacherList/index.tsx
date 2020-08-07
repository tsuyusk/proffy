import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';
import TeacherItem from '../../components/TeacherItem';

import Select from '../../components/Select';
import Input from '../../components/Input';

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
  const [subject, setSubject] = useState('');
  const [week_day, setWeek_day] = useState('');
  const [time, setTime] = useState('');
  return (
    <div id="page-teacher-list" className="container">
      <Header title="Esses são os proffys disponiveis:">
        <form id="search-teachers">
          <Select
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Ciências', label: 'Ciências' },
              { value: 'Educação Física', label: 'Educação Física' },
              { value: 'Química', label: 'Química' },
              { value: 'Física', label: 'Física' },
              { value: 'Sociologia', label: 'Sociologia' },
              { value: 'Filosofia', label: 'Filosofia' },
              { value: 'Português', label: 'Português' },
              { value: 'Matemática', label: 'Matemática' },
            ]}
            value={subject}
            onChange={e => setSubject(e.target.value)}
            label="Matéria"
            name="subject"
            autoComplete="off"
          />

          <Select
            options={[
              { value: '0', label: 'Domingo' },
              { value: '1', label: 'Segunda-Feira' },
              { value: '2', label: 'Terça-Feira' },
              { value: '3', label: 'Quarta-Feira' },
              { value: '4', label: 'Quinta-Feira' },
              { value: '5', label: 'Sexta-Feira' },
              { value: '6', label: 'Sábado' },
            ]}
            value={week_day}
            onChange={e => setWeek_day(e.target.value)}
            label="Dia da semana"
            name="week-day"
            autoComplete="off"
          />

          <Input type="time" label="Hora" name="time" autoComplete="off" />
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
