import className from 'classnames';


export const Avatar = ({ avatar, ...rest }) => {

  const classes = className(
    'avatar',
    rest.className
  )

  return (
    <div {...rest} className={classes}>
      <img src={ avatar } alt="" />
    </div>
  );
}
