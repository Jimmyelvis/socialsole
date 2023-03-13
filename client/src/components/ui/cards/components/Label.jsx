import className from 'classnames';


export const Label = ({
  label,
  frosted,
  small
}) => {

  const classes = className(
    'card-label',
    {
    'card-label-small': small,
    }
  )

  return (
    <div className={classes}>
      <div className="label-text">
        {label}
      </div>
    </div>
  )
}
