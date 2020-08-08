import React, { useState, FormEvent } from 'react';

import Header from '../../components/Header';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import Select from '../../components/Select';
import Input from '../../components/Input';

import './styles.css';
import api from '../../services/api';

const TeacherList: React.FC = () => {
  const [teachers, setTeachers] = useState([]);
  const [subject, setSubject] = useState('');
  const [week_day, setWeek_day] = useState('');
  const [time, setTime] = useState('');

  async function searchForTeachers(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const response = await api.get('/classes', {
      params: {
        subject,
        time,
        week_day,
      },
    });

    setTeachers(response.data);
  }

  return (
    <div id="page-teacher-list" className="container">
      <Header title="Esses são os proffys disponiveis:">
        <form id="search-teachers" onSubmit={searchForTeachers}>
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

          <Input
            value={time}
            onChange={e => setTime(e.target.value)}
            type="time"
            label="Hora"
            name="time"
            autoComplete="off"
          />
          <button>Buscar</button>
        </form>
      </Header>
      <main>
        {teachers.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} />;
        })}
      </main>
    </div>
  );
};

export default TeacherList;
