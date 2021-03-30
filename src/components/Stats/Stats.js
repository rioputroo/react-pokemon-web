import './Stats.css';

function Stats(props) {

let classes = [];

if (props.stats.base_stat <= 70) {
    classes.push('orange');
}

if (props.stats.base_stat <= 40) {
    classes.push('red');
}

  return (
    <div className="Stat">
      <span className="StatName">{props.stats.stat.name}</span>
      <span className={"StatValue " + classes.join(' ')}>{props.stats.base_stat}</span>
    </div>
  );
}

export default Stats;
