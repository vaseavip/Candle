interface EmployeeProps {
  image: string;
  name: string;
  role: string;
}

function Employee({ image, name, role }: EmployeeProps) {
  return (
    <div className="col-sm-6 col-lg-3">
      <div className="member">
        <div className="member-img">
          <img src={image} alt={name} className="img-fluid" />
        </div>

        <div className="member-info">
          <h4>{name}</h4>
          <span>{role}</span>
        </div>
      </div>
    </div>
  );
}

export default Employee;
