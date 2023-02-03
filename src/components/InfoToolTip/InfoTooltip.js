function InfoTooltip(props) {

  return (
    <div className={`tooltip` + (props.isOpen? " tooltip_opened" : "" )}>
      <h2 className="tooltip__title">{props.title}</h2>
      <p className="tooltip__subtitle">{props.subtitle}</p>
      <button className="tooltip__button" onClick={props.onClose} type="button" aria-label="Close">Назад</button>
    </div>
  )
}

export default InfoTooltip;
