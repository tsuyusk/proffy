import React, { useState, FormEvent } from 'react';

import api from '../../services/api';
import './styles.css';

import warningIcon from '../../assets/icons/warning.svg';

import Header from '../../components/Header';
import Input from '../../components/Input';
import Select from '../../components/Select';

import TextArea from '../../components/TextArea';

interface ScheduleItem {
  week_day: number;
  from: string;
  to: string;
}

const TeacherForm: React.FC = () => {
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bio, setBio] = useState('');

  const [subject, setSubject] = useState('');
  const [cost, setCost] = useState('');

  const [scheduleItems, setScheduleItems] = useState<ScheduleItem[]>([
    { week_day: 0, from: '', to: '' },
  ]);

  function handleAddScheduleItem() {
    setScheduleItems([...scheduleItems, { week_day: 0, from: '', to: '' }]);
  }

  async function handleSubmitClass(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await api.post('classes', {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems,
      });
      alert('Cadastrado com sucesso');
    } catch {
      alert('Erro no cadastro!');
    }
  }

  function changeScheduleItemValue(
    position: number,
    field: string,
    value: string,
  ) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });

    setScheduleItems(updatedScheduleItems);
  }

  return (
    <div id="page-teacher-form">
      <Header
        title="Que bom que você quer dar aulas!"
        description="O primeiro passo é preencher esse formulário de inscrição"
      />

      <main>
        <form onSubmit={handleSubmitClass}>
          <fieldset>
            <legend>Seus dados</legend>
            <Input
              value={name}
              onChange={e => setName(e.target.value)}
              name="name"
              label="Nome completo"
            />
            <Input
              value={avatar}
              onChange={e => setAvatar(e.target.value)}
              name="avatar"
              label="Avatar"
            />
            <Input
              value={whatsapp}
              onChange={e => setWhatsapp(e.target.value)}
              name="whatsapp"
              label="Whatsapp"
            />
            <TextArea
              value={bio}
              onChange={e => setBio(e.target.value)}
              label="Biografia"
              name="bio"
            />
          </fieldset>
          <fieldset>
            <legend>Sobre a aula</legend>
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
              name="subject"
              label="Matéria"
            />
            <Input
              value={cost}
              onChange={e => setCost(e.target.value)}
              name="cost"
              label="Custo da sua hora por aula"
              type="number"
            />
          </fieldset>

          <fieldset>
            <legend>
              Horários disponiveis
              <button onClick={handleAddScheduleItem} type="button">
                + Novo Horário
              </button>
            </legend>
            {scheduleItems.map((scheduleItem, index) => (
              <div key={scheduleItem.week_day} className="schedule-item">
                <Select
                  value={scheduleItem.week_day}
                  options={[
                    { value: '0', label: 'Domingo' },
                    { value: '1', label: 'Segunda-Feira' },
                    { value: '2', label: 'Terça-Feira' },
                    { value: '3', label: 'Quarta-Feira' },
                    { value: '4', label: 'Quinta-Feira' },
                    { value: '5', label: 'Sexta-Feira' },
                    { value: '6', label: 'Sábado' },
                  ]}
                  onChange={e =>
                    changeScheduleItemValue(index, 'week_day', e.target.value)
                  }
                  label="Dia da semana"
                  name="week_day"
                  autoComplete="off"
                />
                <Input
                  value={scheduleItem.from}
                  onChange={e =>
                    changeScheduleItemValue(index, 'from', e.target.value)
                  }
                  name="from"
                  label="De"
                  type="time"
                />

                <Input
                  value={scheduleItem.to}
                  onChange={e =>
                    changeScheduleItemValue(index, 'to', e.target.value)
                  }
                  name="to"
                  label="Até"
                  type="time"
                />
              </div>
            ))}
          </fieldset>

          <footer>
            <p>
              <img src={warningIcon} alt="Importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  );
};

export default TeacherForm;
