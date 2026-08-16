import Employee from './Employee';

import teamImg1 from '../../assets/images/team/team-1.jpg';
import teamImg2 from '../../assets/images/team/team-2.jpg';
import teamImg3 from '../../assets/images/team/team-3.jpg';
import teamImg4 from '../../assets/images/team/team-4.jpg';

const team = [
  {
    image: teamImg1,
    name: 'Mihai Ionescu',
    role: 'Founder & Master Candle Maker',
  },
  {
    image: teamImg2,
    name: 'Elena Popescu',
    role: 'Product Designer',
  },
  {
    image: teamImg3,
    name: 'Andrei Marin',
    role: 'Head of Production',
  },
  {
    image: teamImg4,
    name: 'Cristina Rusu',
    role: 'Customer Care',
  },
];

function Team() {
  return (
    <section className="team">
      <div className="text">
        <h2>Meet the Team</h2>
      </div>

      <div className="container my-4">
        <div className="row g-4">
          {team.map((member) => (
            <Employee
              key={member.name}
              image={member.image}
              name={member.name}
              role={member.role}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Team;
