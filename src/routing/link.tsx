import * as React from 'react';
import PropTypes from 'prop-types';

import {HISTORY_PUSH} from './index';

export type LinkProps = {
  to: string,
  children?: any,
  target?: string,
  rel?: string,
  onClick?: Function
}

const isMod = e => !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
const isLeft = e => e.button === 0;

const Link: React.StatelessComponent<LinkProps> = ({
  children,
  to = '#',
  target = '_self',
  onClick = f => f,
  ...props
}, {dispatch}) => {

  const click = e => {
    onClick(e);

    // Keep normal behavior for external links
    if (/^(([a-zA-Z]+\:)|(\/\/))/.test(to)) { return; }

    if (e.defaultPrevented || target !== '_self' || !isLeft(e) || isMod(e)) { return; }

    e.preventDefault();
    dispatch(HISTORY_PUSH(to));
  };

  return (
    <a {...props}
    href={to}
    target={target}
    onClick={click}
    rel={props.rel || target === '_blank' ? 'noopener noreferrer' : ''}>
    {children}
    </a>
  );

};

Link.contextTypes = {dispatch: PropTypes.func};

export default Link;
