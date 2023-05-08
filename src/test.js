import React from 'react';
import {Link, Route, Routes} from 'react-router-dom';

function Button({children}) {
  return <button>{children}</button>;
}

export default function Test() {
  return (
    <div>
      {/* 👇️ react router link */}
      <Link to="/about">
        <Button>Custom Button</Button>
      </Link>

      <Routes>
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

function About() {
  return <div>About page - bobbyhadz.com</div>;
}
