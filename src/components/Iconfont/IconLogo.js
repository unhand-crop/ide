/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconLogo = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'px'} height={size + 'px'} style={style} {...rest}>
      <path
        d="M511.806682 510.958576m-505.851236 0a505.851236 505.851236 0 1 0 1011.702471 0 505.851236 505.851236 0 1 0-1011.702471 0Z"
        fill={getIconColor(color, 0, '#FFFFFF')}
      />
      <path
        d="M511.806682 1019.927847C231.161736 1019.927847 2.837412 791.60664 2.837412 510.958576 2.837412 230.31363 231.161736 1.989306 511.806682 1.989306s508.96927 228.321206 508.96927 508.966152c0 280.651182-228.324324 508.972388-508.96927 508.972389z m0-1011.702472C234.59781 8.225375 9.073481 233.752823 9.073481 510.958576c0 277.208872 225.524329 502.733201 502.733201 502.733201s502.733201-225.524329 502.733201-502.733201c0-277.205754-225.524329-502.733201-502.733201-502.733201z"
        fill={getIconColor(color, 1, '#030303')}
      />
      <path
        d="M847.827923 154.670109c24.78214 16.718902 53.935764 39.040912 112.545462 119.872843 129.644763 245.046344 37.460068 549.082786-206.161334 681.384115a185.897227 185.897227 0 0 0-39.334008-57.427962c-42.483222-33.631122-278.10063-82.013666-327.66179-98.336577-52.710376-16.519348 7.277493-25.371448-35.009293-53.496121-50.939332-33.827558 56.249345 32.256069 70.411458-7.277493 14.162113-39.530443-91.062202-92.240819-44.843574-71.982948 23.600404 10.227154 98.336577 23.011096 174.647357 42.087232 50.742896 12.783942 64.312583 4.327832 44.843575 0s-121.547227-72.179384-133.149434-189.202344c-7.277493-75.129045 16.718902-225.979562 29.303289-249.187094s22.028915-36.580783 48.382544-4.131396c26.353629 32.452505 44.64402 54.281865 49.168289 53.103248l31.663642-11.40577 9.244973-3.53897 127.053676-46.022191c6.095758-1.96748 37.369645-93.026564 44.447584-104.239017 7.077939-11.212453 17.305092-18.489946 44.447584-0.199555z"
        fill={getIconColor(color, 2, '#030303')}
      />
      <path
        d="M753.457486 958.106573l-0.679731-1.555899a183.402799 183.402799 0 0 0-39.006614-56.947785c-29.502844-23.344726-153.366771-53.898347-243.805366-76.207885-38.276994-9.441409-68.512576-16.899748-83.24529-21.754528-13.825366-4.334068-21.034262-8.449874-23.347843-13.34207-1.892647-4.000438-0.311803-7.922926 1.219151-11.717575 2.949661-7.321145 6.295312-15.618236-13.251647-28.62044-15.116232-10.036954-14.985275-10.289514-14.146523-11.9296 0.85746-1.674385 1.964362-1.256568 10.588845 2.001778 15.555875 5.880613 47.927311 18.106427 64.590088 10.408 4.309124-1.989306 7.177716-5.122931 8.77415-9.578603 8.780386-24.513989-31.423553-55.129971-48.591452-68.200772-7.891746-6.011571-8.905107-6.781725-7.929162-8.44052 0.93541-1.583962 1.852113-1.465476 13.772359 3.757232 13.800421 5.98039 45.170968 12.821359 84.888493 21.486377 27.313984 5.955446 58.27295 12.709109 89.51254 20.516668 33.462748 8.431166 48.538446 7.205778 51.188775 5.618698-0.667259-0.551892-2.622267-1.596434-7.062349-2.581732-9.634727-2.14209-40.157168-19.827582-70.339744-52.813272-25.767438-28.158971-57.792772-74.917019-64.025724-137.757889-7.324263-75.621695 16.612889-226.356844 29.487254-250.088206 7.152772-13.186169 13.354542-23.344726 22.546509-24.195949 7.754552-0.72962 16.840505 5.575046 28.411532 19.824464 17.027587 20.962547 42.701485 52.576301 47.503258 52.576301l0.087305-0.003119 31.504622-11.362118 9.21691-3.529615 127.081739-46.031546c3.336297-2.095319 16.179482-35.408402 25.55853-59.735308 8.081946-20.956311 15.056989-39.053384 18.100192-43.870748 2.91848-4.614691 7.196424-10.111786 14.477035-11.642741 8.125598-1.705565 18.655201 1.883293 32.162527 10.984836 25.499287 17.205315 55.223512 40.659172 112.935216 120.250125 62.996772 119.040327 76.139288 255.469934 37.12332 384.338307-39.006614 128.827838-125.5882 235.134112-243.805366 299.331327l-1.493539 0.813807z m-407.218445-217.32078c2.500664 1.708683 5.166583 3.476609 6.825378 4.580393 21.664105 14.408438 17.648076 24.373677 14.42091 32.383908-1.453004 3.604448-2.597323 6.451214-1.290866 9.216911 1.861467 3.931842 8.889517 7.760788 21.483259 11.70822 14.642291 4.8236 46.337113 12.643631 83.036381 21.695285 90.716101 22.378135 214.960428 53.025297 245.127413 76.909443a186.545778 186.545778 0 0 1 39.106391 56.467608c116.732982-63.882294 202.223256-169.184561 240.824525-296.680998 38.775879-128.076392 25.714432-263.667247-36.783455-381.790873-57.293887-78.99229-86.765551-102.262183-112.034103-119.311596-12.777706-8.608894-22.515328-12.05744-29.780349-10.520249-4.789301 1.007125-8.640074 4.168812-12.481493 10.258334-2.881064 4.558567-10.139849 23.388378-17.825804 43.32821-17.127364 44.419522-23.846729 60.399449-27.46365 61.562476L632.402909 306.596348l-9.216911 3.529616-31.691704 11.418243c-5.294423 1.378171-17.84763-12.877483-50.908152-53.586544-10.710449-13.186169-19.091726-19.285044-25.708196-18.6895-7.654775 0.710912-13.388841 10.220918-20.092615 22.577689-12.743408 23.494391-36.406173 173.110166-29.122444 248.295337 11.642741 117.397123 114.746794 184.010816 131.936519 187.82729 8.689963 1.930063 9.382166 4.209347 9.609782 4.954557a2.581733 2.581733 0 0 1-0.654787 2.578614c-3.420484 3.579504-21.938492 3.710461-54.515718-4.499324-31.189701-7.795087-62.123723-14.542514-89.41588-20.494841-39.882781-8.699317-71.384286-15.568347-85.471566-21.670341a439.455806 439.455806 0 0 0-4.26859-1.848995l1.559018 1.191089c17.713555 13.4855 59.189652 45.068073 49.639112 71.736624-1.867703 5.210236-5.366138 9.029828-10.401764 11.359-17.850748 8.25032-51.048464-4.290416-67.000329-10.323813a18.312218 18.312218 0 0 0-0.439643-0.165256z"
        fill={getIconColor(color, 3, '#030303')}
      />
      <path
        d="M646.331169 700.16092c-76.114344 8.45611-132.560126 3.735406-168.944472-14.162114a540.586142 540.586142 0 0 1-66.869371-35.795038 39.340243 39.340243 0 0 0-35.991474-28.321108 30.678343 30.678343 0 0 0-34.220431 22.421787 31.467206 31.467206 0 0 0-33.238249-1.574608 21.236934 21.236934 0 0 0-6.095758 27.928237 22.215997 22.215997 0 0 0-22.028915 22.814659 21.639161 21.639161 0 0 0 14.35855 24.78214 29.496608 29.496608 0 0 0-9.244973 35.991474c5.113577 14.554986 19.668563 21.240052 41.890796 19.668563a616.528994 616.528994 0 0 0 95.583352 51.332204c54.674738 23.603522 194.708793 38.15539 263.545644 59.00257 45.760277 13.111336 45.760277-27.011534 0-120.365492l-38.744699-63.723274z"
        fill={getIconColor(color, 4, '#030303')}
      />
      <path
        d="M331.846193 707.04554a14.355432 14.355432 0 0 0-7.473929-18.489945 14.158995 14.158995 0 0 0-19.668563 4.720704 13.971913 13.971913 0 0 0 7.47393 18.489946 14.355432 14.355432 0 0 0 19.668562-4.723823zM347.975787 685.605934a15.138058 15.138058 0 0 0-17.111775-24.582585 15.138058 15.138058 0 0 0 17.111775 24.582585zM382.785525 670.854512a15.141176 15.141176 0 1 0-13.766123-26.550065 15.144294 15.144294 0 0 0 13.766123 26.550065zM334.602536 735.363531a15.144294 15.144294 0 1 0-10.616908 16.718902 14.162113 14.162113 0 0 0 10.616908-16.718902z"
        fill={getIconColor(color, 5, '#FFFFFF')}
      />
      <path
        d="M360.866724 751.598635a27.887702 41.048926 32.737 1 0 44.397175-69.057572 27.887702 41.048926 32.737 1 0-44.397175 69.057572Z"
        fill={getIconColor(color, 6, '#FFFFFF')}
      />
    </svg>
  );
};

IconLogo.defaultProps = {
  size: 18,
};

export default IconLogo;