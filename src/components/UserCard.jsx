const UserCard = ({user, status}) => {
    // const {user} = props;
    const {firstName, lastName, photoUrl, age, about, gender} = user;
    return <div className="">
        <div className="card bg-base-200 w-96 shadow-sm">
  <figure>
    <img
      src={photoUrl}
      alt="Shoes" />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName + " " + lastName}</h2>
    {age && gender &&<p>{age + " ,"+ gender}</p>}
    <p>{about}</p>
    {status && <div className="card-actions justify-center my-4">
        <button className="btn btn-primary">Ignore</button>
      <button className="btn btn-secondary">Interested</button>
    </div>}
  </div>
</div>
    </div>
}

export default UserCard;