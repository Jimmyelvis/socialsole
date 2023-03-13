import classNames from 'classnames';

export const Panel = ({ children, className, frosted, ...rest }) => {
  const finalClassNames = classNames(
    'panel',
    {
      'panel-frosted': frosted
    },
    className
  );

  return (
    <div {...rest} className={finalClassNames}>
      {children}
    </div>
  );
}


