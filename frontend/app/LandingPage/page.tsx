'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';


const HeartIcon = ({ className }: { className: string }) => (
  <svg width="50" height="44" viewBox="0 0 50 44" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.45966 21.9877H7.50611L25.0122 39.5583L39.3888 25.1288H43.8142L25.0122 44L3.86308 22.7975C3.29258 22.2249 2.78729 21.6074 2.34719 20.9448C1.90709 20.2822 1.52404 19.5828 1.19804 18.8466H7.13936L14.0587 11.9264L25.0122 22.8957L32.8362 15.0675L36.6259 18.8466H45.3056C45.8272 18.0123 46.2266 17.1288 46.5037 16.1963C46.7808 15.2638 46.9193 14.3067 46.9193 13.3252C46.9193 11.9018 46.6544 10.5767 46.1247 9.34969C45.5949 8.1227 44.8696 7.05521 43.9487 6.14724C43.0277 5.23926 41.9519 4.52761 40.7213 4.01227C39.4906 3.49693 38.1663 3.23926 36.7482 3.23926C35.379 3.23926 34.1646 3.45603 33.1051 3.88957C32.0456 4.32311 31.0676 4.89162 30.1711 5.59509C29.2747 6.29857 28.4148 7.09611 27.5917 7.98773C26.7685 8.87934 25.9087 9.78323 25.0122 10.6994C24.132 9.81595 23.2763 8.92434 22.445 8.02454C21.6137 7.12474 20.7457 6.31493 19.8411 5.59509C18.9364 4.87526 17.9503 4.2863 16.8826 3.82822C15.815 3.37014 14.6129 3.1411 13.2763 3.1411C11.8745 3.1411 10.5583 3.40695 9.32763 3.93865C8.09698 4.47035 7.02119 5.19836 6.10024 6.1227C5.1793 7.04703 4.45395 8.12679 3.92421 9.36196C3.39446 10.5971 3.12958 11.9182 3.12958 13.3252C3.12958 14.0941 3.21923 14.8875 3.39853 15.7055H0.195599C0.114099 15.3129 0.0611247 14.9202 0.0366748 14.5276C0.0122249 14.135 0 13.7423 0 13.3497C0 11.501 0.346373 9.76687 1.03912 8.14724C1.73187 6.52761 2.67726 5.11247 3.87531 3.90184C5.07335 2.69121 6.47922 1.73824 8.09291 1.04294C9.7066 0.347648 11.4344 0 13.2763 0C14.6292 0 15.8354 0.155419 16.8949 0.466258C17.9544 0.777096 18.9364 1.20654 19.8411 1.7546C20.7457 2.30266 21.6096 2.96115 22.4328 3.73006C23.2559 4.49898 24.1157 5.34151 25.0122 6.25767C25.9087 5.34151 26.7685 4.49898 27.5917 3.73006C28.4148 2.96115 29.2787 2.30266 30.1834 1.7546C31.088 1.20654 32.0701 0.777096 33.1296 0.466258C34.1891 0.155419 35.3953 0 36.7482 0C38.5738 0 40.2934 0.347648 41.9071 1.04294C43.5208 1.73824 44.9267 2.68303 46.1247 3.8773C47.3227 5.07157 48.2681 6.47853 48.9609 8.09816C49.6536 9.71779 50 11.4438 50 13.2761C50 14.863 49.7229 16.4049 49.1687 17.9018C48.6145 19.3988 47.824 20.7607 46.7971 21.9877H35.3056L32.8362 19.4847L25.0122 27.362L14.0587 16.3436L8.45966 21.9877Z" fill="#159EEC"/>
</svg>

 
);

const CheckupIcon = ({ className }: { className: string }) => (
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M11.7601 15.0533C11.6352 15.1772 11.536 15.3247 11.4683 15.4872C11.4006 15.6497 11.3657 15.8239 11.3657 15.9999C11.3657 16.176 11.4006 16.3502 11.4683 16.5127C11.536 16.6752 11.6352 16.8227 11.7601 16.9466C12.01 17.1949 12.3479 17.3343 12.7001 17.3343C13.0524 17.3343 13.3903 17.1949 13.6401 16.9466C13.7651 16.8227 13.8643 16.6752 13.932 16.5127C13.9997 16.3502 14.0345 16.176 14.0345 15.9999C14.0345 15.8239 13.9997 15.6497 13.932 15.4872C13.8643 15.3247 13.7651 15.1772 13.6401 15.0533C13.3903 14.8049 13.0524 14.6656 12.7001 14.6656C12.3479 14.6656 12.01 14.8049 11.7601 15.0533ZM15.0535 18.3599C14.8051 18.6098 14.6658 18.9477 14.6658 19.2999C14.6658 19.6522 14.8051 19.9901 15.0535 20.2399C15.1774 20.3649 15.3249 20.4641 15.4874 20.5318C15.6499 20.5995 15.8241 20.6343 16.0001 20.6343C16.1762 20.6343 16.3504 20.5995 16.5129 20.5318C16.6754 20.4641 16.8229 20.3649 16.9468 20.2399C17.1951 19.9901 17.3345 19.6522 17.3345 19.2999C17.3345 18.9477 17.1951 18.6098 16.9468 18.3599C16.8229 18.235 16.6754 18.1358 16.5129 18.0681C16.3504 18.0004 16.1762 17.9655 16.0001 17.9655C15.8241 17.9655 15.6499 18.0004 15.4874 18.0681C15.3249 18.1358 15.1774 18.235 15.0535 18.3599ZM27.0535 5.02661C25.6031 3.56424 23.6446 2.71761 21.5856 2.66297C19.5267 2.60834 17.5261 3.3499 16.0001 4.73328C14.4813 3.36605 12.4968 2.63192 10.4538 2.6815C8.41078 2.73109 6.46422 3.56064 5.01347 4.99994C3.57216 6.45306 2.74261 8.40333 2.69548 10.4495C2.64836 12.4956 3.38725 14.482 4.76014 15.9999C3.7337 17.1475 3.06019 18.5668 2.82042 20.0876C2.58065 21.6084 2.78481 23.1661 3.40841 24.5738C4.032 25.9814 5.04853 27.1792 6.33601 28.0235C7.6235 28.8677 9.12725 29.3225 10.6668 29.3333C12.6404 29.3354 14.5433 28.598 16.0001 27.2666C17.5198 28.6377 19.5071 29.3743 21.5533 29.3247C23.5994 29.2751 25.5488 28.4431 27.0001 26.9999C28.4396 25.5451 29.2667 23.5939 29.3114 21.5478C29.356 19.5016 28.6148 17.5162 27.2401 15.9999C28.6148 14.4837 29.356 12.4983 29.3114 10.4521C29.2667 8.406 28.4396 6.45479 27.0001 4.99994L27.0535 5.02661ZM25.1068 6.89328C26.034 7.84713 26.5714 9.11306 26.6133 10.4427C26.6552 11.7723 26.1988 13.0696 25.3335 14.0799L17.9201 6.66661C18.9394 5.82092 20.2327 5.37715 21.5564 5.4189C22.8801 5.46065 24.1429 5.98504 25.1068 6.89328ZM6.89347 25.1066C5.96623 24.1528 5.42892 22.8868 5.38699 21.5572C5.34505 20.2276 5.80152 18.9303 6.66681 17.9199L14.1335 25.3866C13.103 26.2373 11.7954 26.6789 10.4601 26.6273C9.12479 26.5757 7.85522 26.0344 6.89347 25.1066ZM25.1068 25.1066C24.0945 26.0748 22.7476 26.6152 21.3468 26.6152C19.946 26.6152 18.5992 26.0748 17.5868 25.1066L6.92014 14.4399C5.9268 13.4407 5.36925 12.0889 5.36925 10.6799C5.36925 9.27095 5.9268 7.91921 6.92014 6.91994C7.91941 5.9266 9.27115 5.36905 10.6801 5.36905C12.0891 5.36905 13.4409 5.9266 14.4401 6.91994L25.1068 17.5866C26.1001 18.5859 26.6577 19.9376 26.6577 21.3466C26.6577 22.7556 26.1001 24.1073 25.1068 25.1066ZM18.3601 15.0533C18.2352 15.1772 18.136 15.3247 18.0683 15.4872C18.0006 15.6497 17.9657 15.8239 17.9657 15.9999C17.9657 16.176 18.0006 16.3502 18.0683 16.5127C18.136 16.6752 18.2352 16.8227 18.3601 16.9466C18.61 17.1949 18.9479 17.3343 19.3001 17.3343C19.6524 17.3343 19.9903 17.1949 20.2401 16.9466C20.3651 16.8227 20.4643 16.6752 20.532 16.5127C20.5997 16.3502 20.6345 16.176 20.6345 15.9999C20.6345 15.8239 20.5997 15.6497 20.532 15.4872C20.4643 15.3247 20.3651 15.1772 20.2401 15.0533C19.9903 14.8049 19.6524 14.6656 19.3001 14.6656C18.9479 14.6656 18.61 14.8049 18.3601 15.0533ZM15.0535 11.7599C14.8051 12.0098 14.6658 12.3477 14.6658 12.6999C14.6658 13.0522 14.8051 13.3901 15.0535 13.6399C15.1774 13.7649 15.3249 13.8641 15.4874 13.9318C15.6499 13.9995 15.8241 14.0343 16.0001 14.0343C16.1762 14.0343 16.3504 13.9995 16.5129 13.9318C16.6754 13.8641 16.8229 13.7649 16.9468 13.6399C17.1951 13.3901 17.3345 13.0522 17.3345 12.6999C17.3345 12.3477 17.1951 12.0098 16.9468 11.7599C16.8229 11.635 16.6754 11.5358 16.5129 11.4681C16.3504 11.4004 16.1762 11.3655 16.0001 11.3655C15.8241 11.3655 15.6499 11.4004 15.4874 11.4681C15.3249 11.5358 15.1774 11.635 15.0535 11.7599Z" fill="#159EEC"/>
</svg>

);

const CardiogramIcon = ({ className }: { className: string }) => (
<svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M26 8H22V4H26C26.5304 4 27.0391 3.78929 27.4142 3.41421C27.7893 3.03914 28 2.53043 28 2C28 1.46957 27.7893 0.960859 27.4142 0.585786C27.0391 0.210714 26.5304 0 26 0H10C7.34784 0 4.8043 1.05357 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10V38C0 38.5304 0.210714 39.0391 0.585787 39.4142C0.96086 39.7893 1.46957 40 2 40C2.53043 40 3.03914 39.7893 3.41421 39.4142C3.78929 39.0391 4 38.5304 4 38V10C4 8.4087 4.63214 6.88258 5.75736 5.75736C6.88258 4.63214 8.4087 4 10 4H18V8H14C12.4087 8 10.8826 8.63214 9.75736 9.75736C8.63214 10.8826 8 12.4087 8 14V23.86C7.99963 24.8498 8.24414 25.8243 8.71175 26.6967C9.17935 27.5691 9.85553 28.3123 10.68 28.86L14 31.08V32C14 33.0609 14.4214 34.0783 15.1716 34.8284C15.9217 35.5786 16.9391 36 18 36V38C18 38.5304 18.2107 39.0391 18.5858 39.4142C18.9609 39.7893 19.4696 40 20 40C20.5304 40 21.0391 39.7893 21.4142 39.4142C21.7893 39.0391 22 38.5304 22 38V36C23.0609 36 24.0783 35.5786 24.8284 34.8284C25.5786 34.0783 26 33.0609 26 32V31.08L29.32 28.86C30.1445 28.3123 30.8206 27.5691 31.2882 26.6967C31.7559 25.8243 32.0004 24.8498 32 23.86V14C32 12.4087 31.3679 10.8826 30.2426 9.75736C29.1174 8.63214 27.5913 8 26 8ZM24 18H28V20H26C25.4696 20 24.9609 20.2107 24.5858 20.5858C24.2107 20.9609 24 21.4696 24 22C24 22.5304 24.2107 23.0391 24.5858 23.4142C24.9609 23.7893 25.4696 24 26 24H28C27.9786 24.3036 27.8883 24.5984 27.7358 24.8618C27.5833 25.1252 27.3727 25.3503 27.12 25.52L22.92 28.34C22.6412 28.5189 22.4111 28.7642 22.2506 29.0539C22.09 29.3437 22.0039 29.6688 22 30V32H18V30C17.9983 29.6706 17.9153 29.3467 17.7582 29.0571C17.6012 28.7675 17.3751 28.5212 17.1 28.34L12.9 25.52C12.6249 25.3388 12.3988 25.0925 12.2418 24.8029C12.0847 24.5133 12.0017 24.1894 12 23.86V14C12 13.4696 12.2107 12.9609 12.5858 12.5858C12.9609 12.2107 13.4696 12 14 12H26C26.5304 12 27.0391 12.2107 27.4142 12.5858C27.7893 12.9609 28 13.4696 28 14H24C23.4696 14 22.9609 14.2107 22.5858 14.5858C22.2107 14.9609 22 15.4696 22 16C22 16.5304 22.2107 17.0391 22.5858 17.4142C22.9609 17.7893 23.4696 18 24 18Z" fill="#159EEC"/>
</svg>


);

const DnaIcon = ({ className }: { className: string }) => (
 <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M27.2 0H4.8C3.52696 0 2.30606 0.505713 1.40589 1.40589C0.505713 2.30606 0 3.52696 0 4.8V27.2C0 28.473 0.505713 29.6939 1.40589 30.5941C2.30606 31.4943 3.52696 32 4.8 32H27.2C28.473 32 29.6939 31.4943 30.5941 30.5941C31.4943 29.6939 32 28.473 32 27.2V4.8C32 3.52696 31.4943 2.30606 30.5941 1.40589C29.6939 0.505713 28.473 0 27.2 0ZM28.8 27.2C28.8 27.6243 28.6314 28.0313 28.3314 28.3314C28.0313 28.6314 27.6243 28.8 27.2 28.8H4.8C4.37565 28.8 3.96869 28.6314 3.66863 28.3314C3.36857 28.0313 3.2 27.6243 3.2 27.2V4.8C3.2 4.37565 3.36857 3.96869 3.66863 3.66863C3.96869 3.36857 4.37565 3.2 4.8 3.2H27.2C27.6243 3.2 28.0313 3.36857 28.3314 3.66863C28.6314 3.96869 28.8 4.37565 28.8 4.8V27.2ZM24 11.2H20.8V8C20.8 7.57565 20.6314 7.16869 20.3314 6.86863C20.0313 6.56857 19.6243 6.4 19.2 6.4H12.8C12.3757 6.4 11.9687 6.56857 11.6686 6.86863C11.3686 7.16869 11.2 7.57565 11.2 8V11.2H8C7.57565 11.2 7.16869 11.3686 6.86863 11.6686C6.56857 11.9687 6.4 12.3757 6.4 12.8V19.2C6.4 19.6243 6.56857 20.0313 6.86863 20.3314C7.16869 20.6314 7.57565 20.8 8 20.8H11.2V24C11.2 24.4243 11.3686 24.8313 11.6686 25.1314C11.9687 25.4314 12.3757 25.6 12.8 25.6H19.2C19.6243 25.6 20.0313 25.4314 20.3314 25.1314C20.6314 24.8313 20.8 24.4243 20.8 24V20.8H24C24.4243 20.8 24.8313 20.6314 25.1314 20.3314C25.4314 20.0313 25.6 19.6243 25.6 19.2V12.8C25.6 12.3757 25.4314 11.9687 25.1314 11.6686C24.8313 11.3686 24.4243 11.2 24 11.2ZM22.4 17.6H19.2C18.7757 17.6 18.3687 17.7686 18.0686 18.0686C17.7686 18.3687 17.6 18.7757 17.6 19.2V22.4H14.4V19.2C14.4 18.7757 14.2314 18.3687 13.9314 18.0686C13.6313 17.7686 13.2243 17.6 12.8 17.6H9.6V14.4H12.8C13.2243 14.4 13.6313 14.2314 13.9314 13.9314C14.2314 13.6313 14.4 13.2243 14.4 12.8V9.6H17.6V12.8C17.6 13.2243 17.7686 13.6313 18.0686 13.9314C18.3687 14.2314 18.7757 14.4 19.2 14.4H22.4V17.6Z" fill="#159EEC"/>
</svg>

);

const BloodIcon = ({ className }: { className: string }) => (
<svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M26 8H22V4H26C26.5304 4 27.0391 3.78929 27.4142 3.41421C27.7893 3.03914 28 2.53043 28 2C28 1.46957 27.7893 0.960859 27.4142 0.585786C27.0391 0.210714 26.5304 0 26 0H10C7.34784 0 4.8043 1.05357 2.92893 2.92893C1.05357 4.8043 0 7.34784 0 10V38C0 38.5304 0.210714 39.0391 0.585787 39.4142C0.96086 39.7893 1.46957 40 2 40C2.53043 40 3.03914 39.7893 3.41421 39.4142C3.78929 39.0391 4 38.5304 4 38V10C4 8.4087 4.63214 6.88258 5.75736 5.75736C6.88258 4.63214 8.4087 4 10 4H18V8H14C12.4087 8 10.8826 8.63214 9.75736 9.75736C8.63214 10.8826 8 12.4087 8 14V23.86C7.99963 24.8498 8.24414 25.8243 8.71175 26.6967C9.17935 27.5691 9.85553 28.3123 10.68 28.86L14 31.08V32C14 33.0609 14.4214 34.0783 15.1716 34.8284C15.9217 35.5786 16.9391 36 18 36V38C18 38.5304 18.2107 39.0391 18.5858 39.4142C18.9609 39.7893 19.4696 40 20 40C20.5304 40 21.0391 39.7893 21.4142 39.4142C21.7893 39.0391 22 38.5304 22 38V36C23.0609 36 24.0783 35.5786 24.8284 34.8284C25.5786 34.0783 26 33.0609 26 32V31.08L29.32 28.86C30.1445 28.3123 30.8206 27.5691 31.2882 26.6967C31.7559 25.8243 32.0004 24.8498 32 23.86V14C32 12.4087 31.3679 10.8826 30.2426 9.75736C29.1174 8.63214 27.5913 8 26 8ZM24 18H28V20H26C25.4696 20 24.9609 20.2107 24.5858 20.5858C24.2107 20.9609 24 21.4696 24 22C24 22.5304 24.2107 23.0391 24.5858 23.4142C24.9609 23.7893 25.4696 24 26 24H28C27.9786 24.3036 27.8883 24.5984 27.7358 24.8618C27.5833 25.1252 27.3727 25.3503 27.12 25.52L22.92 28.34C22.6412 28.5189 22.4111 28.7642 22.2506 29.0539C22.09 29.3437 22.0039 29.6688 22 30V32H18V30C17.9983 29.6706 17.9153 29.3467 17.7582 29.0571C17.6012 28.7675 17.3751 28.5212 17.1 28.34L12.9 25.52C12.6249 25.3388 12.3988 25.0925 12.2418 24.8029C12.0847 24.5133 12.0017 24.1894 12 23.86V14C12 13.4696 12.2107 12.9609 12.5858 12.5858C12.9609 12.2107 13.4696 12 14 12H26C26.5304 12 27.0391 12.2107 27.4142 12.5858C27.7893 12.9609 28 13.4696 28 14H24C23.4696 14 22.9609 14.2107 22.5858 14.5858C22.2107 14.9609 22 15.4696 22 16C22 16.5304 22.2107 17.0391 22.5858 17.4142C22.9609 17.7893 23.4696 18 24 18Z" fill="#159EEC"/>
</svg>

);

const PhoneIcon = ({ className }: { className: string }) => (
<svg width="41" height="39" viewBox="0 0 41 39" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M24.1459 33.126C24.7274 32.7902 25.1502 32.2344 25.3211 31.5808C25.492 30.9272 25.3972 30.2294 25.0574 29.6408L23.7761 27.4216C23.4363 26.8331 22.8794 26.402 22.2279 26.2232C21.5764 26.0445 20.8837 26.1327 20.3021 26.4684C15.9167 29.0003 13.3542 24.562 12.0729 22.3428C10.7917 20.1236 8.22919 15.6852 12.6146 13.1533C13.1962 12.8175 13.6189 12.2617 13.7899 11.6081C13.9608 10.9545 13.8659 10.2567 13.5261 9.66811L12.2449 7.44892C11.905 6.86035 11.3481 6.42927 10.6966 6.25051C10.0451 6.07174 9.35243 6.15994 8.77089 6.4957C3.28908 9.66062 1.28125 13.7788 7.6875 24.8747C14.0938 35.9707 18.6641 36.2909 24.1459 33.126Z" stroke="#1F2B6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M35.8156 23.9621C36.9804 19.4989 36.3314 14.7346 34.0113 10.716C31.6911 6.69743 27.8896 3.75324 23.442 2.53032M29.1022 22.12C29.4492 20.7945 29.5325 19.4104 29.3472 18.0469C29.162 16.6835 28.712 15.3672 28.0227 14.1735C27.3335 12.9798 26.4187 11.9319 25.3305 11.0897C24.2423 10.2476 23.002 9.62766 21.6806 9.26539M22.4248 20.2645C22.6577 19.3714 22.5278 18.4181 22.0635 17.6141C21.5993 16.81 20.8387 16.2208 19.9488 15.9759" stroke="#1F2B6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

);

const LocationIcon = ({ className }: { className: string }) => (
<svg width="32" height="39" viewBox="0 0 32 39" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1 15.4C1 29.8 16 37 16 37C16 37 31 29.8 31 15.4C31 7.45 24.2875 1 16 1C7.7125 1 1 7.45 1 15.4Z" stroke="#1F2B6C" strokeWidth="3"/>
<path d="M15.9998 20.32C18.8496 20.32 21.1598 18.0098 21.1598 15.16C21.1598 12.3102 18.8496 10 15.9998 10C13.1501 10 10.8398 12.3102 10.8398 15.16C10.8398 18.0098 13.1501 20.32 15.9998 20.32Z" stroke="#1F2B6C" strokeWidth="3"/>
</svg>

);

const EmailIcon = ({ className }: { className: string }) => (
 <svg width="39" height="32" viewBox="0 0 39 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.7998 1H37.1998V30.5H1.7998V1Z" stroke="#1F2B6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M37.1998 6.8999L19.4998 18.6999L1.7998 6.8999" stroke="#1F2B6C" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

);

const ClockIcon = ({ className }: { className: string }) => (
<svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.6777 31C24.962 31 31.6777 24.2843 31.6777 16C31.6777 7.71573 24.962 1 16.6777 1C8.39346 1 1.67773 7.71573 1.67773 16C1.67773 24.2843 8.39346 31 16.6777 31Z" stroke="#1F2B6C" strokeWidth="2" strokeLinecap="round"/>
<path d="M21.6777 23.5L16.6777 16V6" stroke="#1F2B6C" strokeWidth="2" strokeLinecap="round"/>
</svg>


);

const ArrowRightIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const LinkedInIcon = ({ className }: { className: string }) => (
 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 0C5.3725 0 0 5.3725 0 12C0 18.6275 5.3725 24 12 24C18.6275 24 24 18.6275 24 12C24 5.3725 18.6275 0 12 0ZM9.0625 16.9738H6.6325V9.15375H9.0625V16.9738ZM7.8325 8.19375C7.065 8.19375 6.56875 7.65 6.56875 6.9775C6.56875 6.29125 7.08 5.76375 7.86375 5.76375C8.6475 5.76375 9.1275 6.29125 9.1425 6.9775C9.1425 7.65 8.6475 8.19375 7.8325 8.19375ZM17.9375 16.9738H15.5075V12.64C15.5075 11.6313 15.155 10.9462 14.2763 10.9462C13.605 10.9462 13.2063 11.41 13.03 11.8563C12.965 12.015 12.9488 12.24 12.9488 12.4638V16.9725H10.5175V11.6475C10.5175 10.6713 10.4862 9.855 10.4537 9.1525H12.565L12.6763 10.2388H12.725C13.045 9.72875 13.8288 8.97625 15.14 8.97625C16.7388 8.97625 17.9375 10.0475 17.9375 12.35V16.9738Z" fill="#1F2B6C"/>
</svg>

);

const FacebookIcon = ({ className }: { className: string }) => (
 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12 0C5.3725 0 0 5.3725 0 12C0 18.6275 5.3725 24 12 24C18.6275 24 24 18.6275 24 12C24 5.3725 18.6275 0 12 0ZM14.8425 8.2925H13.0388C12.825 8.2925 12.5875 8.57375 12.5875 8.9475V10.25H14.8438L14.5025 12.1075H12.5875V17.6838H10.4588V12.1075H8.5275V10.25H10.4588V9.1575C10.4588 7.59 11.5463 6.31625 13.0388 6.31625H14.8425V8.2925Z" fill="#1F2B6C"/>
</svg>

);

const InstagramIcon = ({ className }: { className: string }) => (
 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.8725 8.31375C16.7684 8.04406 16.6089 7.79917 16.4044 7.59486C16.1999 7.39055 15.9548 7.23134 15.685 7.1275C15.3135 6.98991 14.9211 6.91718 14.525 6.9125C13.8663 6.8825 13.6688 6.875 12 6.875C10.3313 6.875 10.1338 6.8825 9.475 6.9125C9.07845 6.91704 8.68564 6.98976 8.31375 7.1275C8.04407 7.23163 7.79918 7.39109 7.59487 7.59562C7.39055 7.80015 7.23135 8.0452 7.1275 8.315C6.98991 8.68649 6.91719 9.07887 6.9125 9.475C6.8825 10.1337 6.875 10.3312 6.875 12C6.875 13.6687 6.8825 13.8662 6.9125 14.525C6.91704 14.9215 6.98977 15.3144 7.1275 15.6862C7.23163 15.9559 7.3911 16.2008 7.59562 16.4051C7.80015 16.6094 8.04521 16.7687 8.315 16.8725C8.6865 17.0101 9.07887 17.0828 9.475 17.0875C10.1338 17.1175 10.3313 17.1237 12 17.1237C13.6688 17.1237 13.8663 17.1175 14.525 17.0862C14.9215 17.0821 15.3143 17.0098 15.6863 16.8725C15.9559 16.7684 16.2008 16.6089 16.4051 16.4044C16.6095 16.1999 16.7687 15.9548 16.8725 15.685C17.0101 15.3135 17.0828 14.9211 17.0875 14.525C17.1175 13.8662 17.1238 13.6687 17.1238 12C17.1238 10.3312 17.1175 10.1337 17.0863 9.475C17.0821 9.07852 17.0098 8.68571 16.8725 8.31375ZM12 15.21C11.3651 15.21 10.7445 15.0217 10.2166 14.669C9.68874 14.3163 9.27731 13.815 9.03435 13.2284C8.79139 12.6419 8.72782 11.9964 8.85168 11.3738C8.97554 10.7511 9.28126 10.1791 9.73019 9.73019C10.1791 9.28126 10.7511 8.97554 11.3738 8.85168C11.9964 8.72782 12.6419 8.79139 13.2284 9.03435C13.815 9.2773 14.3163 9.68874 14.669 10.2166C15.0217 10.7445 15.21 11.3651 15.21 12C15.21 12.8513 14.8718 13.6678 14.2698 14.2698C13.6678 14.8718 12.8513 15.21 12 15.21ZM15.3363 9.41375C15.1879 9.41375 15.0429 9.36976 14.9196 9.28735C14.7962 9.20494 14.7001 9.08781 14.6433 8.95076C14.5866 8.81372 14.5717 8.66292 14.6007 8.51743C14.6296 8.37194 14.701 8.23831 14.8059 8.13342C14.9108 8.02853 15.0444 7.9571 15.1899 7.92816C15.3354 7.89922 15.4862 7.91407 15.6233 7.97084C15.7603 8.0276 15.8774 8.12373 15.9599 8.24707C16.0423 8.37041 16.0863 8.51541 16.0863 8.66375C16.0863 8.86266 16.0072 9.05343 15.8666 9.19408C15.7259 9.33473 15.5352 9.41375 15.3363 9.41375ZM14.0838 12C14.0838 12.4121 13.9615 12.815 13.7326 13.1577C13.5036 13.5003 13.1782 13.7674 12.7974 13.9251C12.4167 14.0828 11.9977 14.1241 11.5935 14.0437C11.1893 13.9633 10.818 13.7648 10.5266 13.4734C10.2352 13.182 10.0367 12.8107 9.95629 12.4065C9.87589 12.0023 9.91716 11.5833 10.0749 11.2026C10.2326 10.8218 10.4997 10.4964 10.8423 10.2674C11.185 10.0385 11.5879 9.91625 12 9.91625C12.5526 9.91625 13.0827 10.1358 13.4734 10.5266C13.8642 10.9173 14.0838 11.4474 14.0838 12ZM12 0C9.62663 0 7.30655 0.703788 5.33316 2.02236C3.35977 3.34094 1.8217 5.21508 0.913451 7.4078C0.00519939 9.60051 -0.232441 12.0133 0.230582 14.3411C0.693605 16.6689 1.83649 18.807 3.51472 20.4853C5.19295 22.1635 7.33115 23.3064 9.65892 23.7694C11.9867 24.2324 14.3995 23.9948 16.5922 23.0865C18.7849 22.1783 20.6591 20.6402 21.9776 18.6668C23.2962 16.6935 24 14.3734 24 12C24 8.8174 22.7357 5.76515 20.4853 3.51472C18.2348 1.26428 15.1826 0 12 0V0ZM18.2125 14.5762C18.2019 15.0949 18.1034 15.608 17.9213 16.0937C17.7607 16.5088 17.5152 16.8858 17.2005 17.2005C16.8858 17.5152 16.5089 17.7607 16.0938 17.9212C15.6084 18.1033 15.0957 18.2018 14.5775 18.2125C13.91 18.2425 13.6975 18.25 12 18.25C10.3025 18.25 10.09 18.2425 9.4225 18.2125C8.90426 18.2018 8.39159 18.1033 7.90625 17.9212C7.49116 17.7607 7.11417 17.5152 6.79947 17.2005C6.48477 16.8858 6.23928 16.5088 6.07875 16.0937C5.89671 15.6084 5.79823 15.0957 5.7875 14.5775C5.7575 13.91 5.75 13.6975 5.75 12C5.75 10.3025 5.7575 10.09 5.7875 9.4225C5.79783 8.90433 5.89588 8.39165 6.0775 7.90625C6.23803 7.4908 6.48364 7.1135 6.79857 6.79856C7.1135 6.48363 7.4908 6.23802 7.90625 6.0775C8.39166 5.89588 8.90433 5.79782 9.4225 5.7875C10.09 5.7575 10.3025 5.75 12 5.75C13.6975 5.75 13.91 5.7575 14.5775 5.7875C15.0957 5.79782 15.6083 5.89588 16.0938 6.0775C16.509 6.23817 16.886 6.48384 17.2007 6.79877C17.5155 7.1137 17.7609 7.49092 17.9213 7.90625C18.1033 8.39158 18.2018 8.90426 18.2125 9.4225C18.2425 10.09 18.25 10.3025 18.25 12C18.25 13.6975 18.2425 13.91 18.2125 14.5775V14.5762Z" fill="#1F2B6C"/>
</svg>

);

export default function Home() {
  const router = useRouter();
  const [currentDoctorSlide, setCurrentDoctorSlide] = useState(0);

  const doctors = [
    { name: 'Jacob Smith', specialty: 'NEUROLOGY', image: '/Images/Doctor1.jpg' },
    { name: 'Sarah Johnson', specialty: 'CARDIOLOGY', image: '/Images/Doctor2.jpg' },
    { name: 'Michael Chen', specialty: 'ORTHOPEDICS', image: '/Images/Doctor3.jpg' },
    { name: 'Emily Davis', specialty: 'PEDIATRICS', image: '/Images/Doctor4.jpg' },
    { name: 'David Wilson', specialty: 'RADIOLOGY', image: '/Images/Doctor5.jpg' },
    { name: 'Lisa Brown', specialty: 'DERMATOLOGY', image: '/Images/Doctor6.jpg' },
    { name: 'Robert Miller', specialty: 'ONCOLOGY', image: '/Images/Doctor2.jpg' },
    { name: 'Amanda Taylor', specialty: 'GYNECOLOGY', image: '/Images/Doctor3.jpg' },
    { name: 'James Anderson', specialty: 'UROLOGY', image: '/Images/Doctor1.jpg' }
  ];

  const totalSlides = Math.ceil(doctors.length / 3);

  const handleNavigation = (section: string) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSocialLink = (platform: string) => {
    const urls = {
      linkedin: 'https://linkedin.com',
      facebook: 'https://facebook.com', 
      instagram: 'https://instagram.com'
    };
    window.open(urls[platform as keyof typeof urls], '_blank');
  };

  return (
    <div>
      <Header />
      
    
     <section className="relative h-[500px] md:h-[600px]">
  <div className="absolute inset-0">
    <Image
      src="/Images/TopImage.jpg"
      alt="Medical Excellence"
      fill
      className="object-cover"
      priority
    />
  </div>

  <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
    <div className="text-left max-w-lg ml-12">
      <p
        className="text-blue-500 text-lg font-bold mb-4"
        style={{ fontFamily: 'var(--font-work-sans)' }}
      >
        CARING FOR LIFE 
      </p>
      <h1
        className="text-4xl md:text-5xl text-blue-900 mb-6"
        style={{ fontFamily: 'var(--font-yeseva-one)' }}
      >
        Leading the Way in Medical Excellence
      </h1>
      <button
        onClick={() => handleNavigation('services')}
        className="px-6 py-3 bg-blue-100 text-blue-900 rounded-full hover:bg-blue-200 transition-colors font-medium"
      >
        Our Services
      </button>
    </div>
  </div>
</section>

    
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-blue-500 text-lg font-bold mb-2">
              WELCOME TO MEDDICAL
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6" style={{ fontFamily: 'var(--font-yeseva-one)' }}>
              A Great Place to Receive Care
            </h2>
            <p className="text-gray-700 max-w-4xl mx-auto mb-8 leading-relaxed">
              Welcome to Meddical, where compassionate care meets advanced treatment. Our mission is to create a safe and welcoming environment where every patient feels valued and supported. From preventive care to specialized services, we are dedicated to improving your health and well-being every step of the way.
            </p>
            <button
              onClick={() => router.push('/Register')}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <span className="mr-2">Learn more</span>
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex justify-center">
            <Image
              src="/Images/Welcome1.jpg"
              alt="Welcome to Meddical"
              width={800}
              height={400}
              className="rounded-lg object-cover"
            />
          </div>
        </div>
      </section>

   
      <section id="services" className="py-16 bg-gray-50 ">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-blue-500 text-lg font-bold mb-2">
              CARE YOU BELIEVE IN
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-blue-900" style={{ fontFamily: 'var(--font-yeseva-one)' }}>
              Our Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="text-center">
                <CheckupIcon className="w-10 h-10 text-blue-500 mx-auto mb-3" />
                <h4 className="text-black font-medium text-sm">Free Checkup</h4>
              </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="text-center">
                <CardiogramIcon className="w-10 h-10 text-blue-500 mx-auto mb-3" />
                <h4 className="text-black font-medium text-sm">Cardiogram</h4>
              </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="text-center">
                <DnaIcon className="w-10 h-10 text-blue-500 mx-auto mb-3" />
                <h4 className="text-black font-medium text-sm">DNA Testing</h4>
              </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="text-center">
                <BloodIcon className="w-10 h-10 text-blue-500 mx-auto mb-3" />
                <h4 className="text-black font-medium text-sm">Blood Bank</h4>
              </div>
              </div>
              <button 
              onClick={() => router.push('/Services')}
              className="w-full py-2 bg-blue-900 text-blue-100 rounded-full hover:bg-blue-800 transition-colors text-sm"
              >
              View All
              </button>
            </div>

            
            <div className="space-y-4">
              <h3 className="text-lg text-black text-center font-medium mb-4">
                A passion for putting patients first
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <span className="text-xs text-gray-700">A Passion for Healing</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <span className="text-xs text-gray-700">All our best</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <span className="text-xs text-gray-700">A Legacy of Excellence</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <span className="text-xs text-gray-700">5-Star Care</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <span className="text-xs text-gray-700">Believe in Us</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                  <span className="text-xs text-gray-700">Always Caring</span>
                </div>
              </div>
              <p className="text-gray-700 text-xs leading-relaxed">
                At our clinic, we go beyond treatment. We provide care that touches lives. Every patient is treated with dignity, compassion, and the highest medical standards. Our dedicated team combines advanced technology with personalized attention, ensuring you receive not just healthcare, but genuine support at every step. From routine checkups to specialized services, we are here to keep you and your loved ones healthy, safe, and cared for.
              </p>
            </div>

         
            <div className="space-y-3">
              <Image
                src="/Images/OurServices1.jpg"
                alt="Our Services"
                width={300}
                height={150}
                className="rounded-lg object-cover w-full"
              />
              <Image
                src="/Images/OurServices2.jpg"
                alt="Our Services"
                width={300}
                height={150}
                className="rounded-lg object-cover w-full"
              />
            </div>
          </div>
        </div>
      </section>

    
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-blue-500 text-lg font-bold mb-2">
              ALWAYS CARING
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900" style={{ fontFamily: 'var(--font-yeseva-one)' }}>
              Our Specialties
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
            <div className="space-y-6">
              <div className="text-center p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
                <HeartIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p className="text-gray-700 font-medium">Neurology</p>
              </div>
              <div className="text-center p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
                <HeartIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p className="text-gray-700 font-medium">Ophthalmology</p>
              </div>
              <div className="text-center p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
                <HeartIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p className="text-gray-700 font-medium">Gastroenterology</p>
              </div>
            </div>

    
            <div className="space-y-6">
              <div className="text-center p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
                <HeartIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p className="text-gray-700 font-medium">Bones</p>
              </div>
              <div className="text-center p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
                <HeartIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p className="text-gray-700 font-medium">Cardiovascular</p>
              </div>
              <div className="text-center p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
                <HeartIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p className="text-gray-700 font-medium">Urology</p>
              </div>
            </div>

    
            <div className="space-y-6">
              <div className="text-center p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
                <HeartIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p className="text-gray-700 font-medium">Oncology</p>
              </div>
              <div className="text-center p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
                <HeartIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p className="text-gray-700 font-medium">Pulmonology</p>
              </div>
              <div className="text-center p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
                <HeartIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p className="text-gray-700 font-medium">Dermatology</p>
              </div>
            </div>

        
            <div className="space-y-6">
              <div className="text-center p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
                <HeartIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p className="text-gray-700 font-medium">Otorhinolaryngology</p>
              </div>
              <div className="text-center p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
                <HeartIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p className="text-gray-700 font-medium">Renal Medicine</p>
              </div>
              <div className="text-center p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
                <HeartIcon className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p className="text-gray-700 font-medium">Gynaecology</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="doctors" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
            <p className="text-blue-500 text-lg font-bold mb-2">
              TRUSTED CARE 
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900" style={{ fontFamily: 'var(--font-yeseva-one)' }}>
              Our Doctors
            </h2>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {doctors.slice(currentDoctorSlide * 3, (currentDoctorSlide * 3) + 3).map((doctor, index) => (
              <div key={index} className="text-center">
                <div className="mb-4">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    width={300}
                    height={300}
                    className="rounded-lg object-cover mx-auto"
                  />
                </div>
                <div className="bg-blue-100 p-4 rounded-lg">
                  <h4 className="text-blue-900 text-lg mb-2">{doctor.name}</h4>
                  <p className="text-blue-900 font-bold text-sm mb-4">{doctor.specialty}</p>
                  <div className="flex justify-center space-x-3">
                    <button
                      onClick={() => handleSocialLink('linkedin')}
                      className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <LinkedInIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleSocialLink('facebook')}
                      className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <FacebookIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleSocialLink('instagram')}
                      className="p-2 text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <InstagramIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        
          <div className="flex justify-center space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentDoctorSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentDoctorSlide === index ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

    
      <section id="contact" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="text-blue-500 text-lg font-bold mb-2">
              Get in touch
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900" style={{ fontFamily: 'var(--font-yeseva-one)' }}>
              Contact
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           
            <div className="bg-blue-100 p-6 rounded-lg text-center">
              <PhoneIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h4 className="font-bold text-blue-900 mb-3" style={{ fontFamily: 'var(--font-work-sans)' }}>
                EMERGENCY
              </h4>
              <p className="text-blue-900 text-sm mb-1">(237) 681-812-255</p>
              <p className="text-blue-900 text-sm">(237) 666-331-894</p>
            </div>

         
            <div className="bg-blue-100 p-6 rounded-lg text-center">
              <LocationIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h4 className="font-bold text-blue-900 mb-3" style={{ fontFamily: 'var(--font-work-sans)' }}>
                LOCATION
              </h4>
              <p className="text-blue-900 text-sm mb-1">Nairobi, Kenya</p>
              <p className="text-blue-900 text-sm">Addis Ababa, Ethiopia</p>
            </div>

          
            <div className="bg-blue-100 p-6 rounded-lg text-center">
              <EmailIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h4 className="font-bold text-blue-900 mb-3" style={{ fontFamily: 'var(--font-work-sans)' }}>
                EMAIL
              </h4>
              <p className="text-blue-900 text-sm mb-1">fildineeesoe@gmail.com</p>
              <p className="text-blue-900 text-sm">myebstudios@gmail.com</p>
            </div>

           
            <div className="bg-blue-100 p-6 rounded-lg text-center">
              <ClockIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h4 className="font-bold text-blue-900 mb-3" style={{ fontFamily: 'var(--font-work-sans)' }}>
                WORKING HOURS
              </h4>
              <p className="text-blue-900 text-sm mb-1">Mon-Sat 09:00-20:00</p>
              <p className="text-blue-900 text-sm">Sunday Emergency only</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}