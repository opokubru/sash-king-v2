import { Spinner } from '@nextui-org/react';
import React, { Suspense } from 'react';

interface ILazyPageWrapper {
  component: React.ReactElement;
}

const LazyPageWrapper = ({ component }: ILazyPageWrapper) => {
  return (
    <Suspense
      fallback={
        <div className="w-full h-screen grid place-items-center">
          <div className="flex flex-col items-center justify-center gap-y-2">
            <img
              src="https://placehold.co/400"
              alt="logo"
              className="w-[8rem] h-auto rounded-md"
            />
            {/* <p className="text-sm">Sneakz</p> */}
            <Spinner size="sm" color="current" />
          </div>
        </div>
      }
    >
      {component}
    </Suspense>
  );
};

export default LazyPageWrapper;
