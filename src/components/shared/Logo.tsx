interface LogoProps {
  width?: number;
  height?: number;
  fill?: string;
}

export function Logo() {
  return (
    <svg
      width="103"
      height="30"
      viewBox="0 0 103 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 4C0 1.79086 1.79086 0 4 0H26C28.2091 0 30 1.79086 30 4V26C30 28.2091 28.2091 30 26 30H4C1.79086 30 0 28.2091 0 26V4Z"
        fill="#00B37E"
      />
      <path
        d="M21.125 10.5H19.875L19.0813 9.75917C18.7942 9.49097 18.4061 9.33814 18 9.33333H16.4375C16.35 9.00596 16.1496 8.71449 15.8674 8.50371C15.5851 8.29293 15.2364 8.17452 14.875 8.16667V11.8767C14.9071 12.4658 15.1566 13.0264 15.5813 13.4633C16.2804 14.0906 17.1948 14.4667 18.1625 14.525L20.3188 13.72C20.5717 13.6252 20.7995 13.4801 20.9863 13.2947C21.173 13.1093 21.3142 12.8882 21.4 12.6467L21.75 11.7542C21.7595 11.6942 21.7595 11.6333 21.75 11.5733V11.0833C21.75 10.9286 21.6842 10.7803 21.5669 10.6709C21.4497 10.5615 21.2908 10.5 21.125 10.5ZM18 11.6667C17.8764 11.6667 17.7555 11.6325 17.6528 11.5684C17.55 11.5043 17.4699 11.4132 17.4226 11.3066C17.3753 11.2 17.3629 11.0827 17.387 10.9695C17.4111 10.8564 17.4707 10.7524 17.5581 10.6709C17.6455 10.5893 17.7568 10.5337 17.8781 10.5112C17.9993 10.4887 18.125 10.5003 18.2392 10.5444C18.3534 10.5886 18.451 10.6633 18.5197 10.7593C18.5883 10.8552 18.625 10.968 18.625 11.0833C18.625 11.238 18.5592 11.3864 18.4419 11.4958C18.3247 11.6052 18.1658 11.6667 18 11.6667Z"
        fill="white"
      />
      <path
        d="M15.1125 13.8483C14.6765 13.4027 14.3916 12.8465 14.2937 12.25H11.75C11.583 12.2603 11.4155 12.2372 11.2589 12.1822C11.1022 12.1272 10.9599 12.0416 10.8416 11.9312C10.7232 11.8207 10.6315 11.6879 10.5726 11.5417C10.5137 11.3955 10.489 11.2392 10.5 11.0833C10.5 10.9286 10.4342 10.7803 10.3169 10.6709C10.1997 10.5615 10.0408 10.5 9.875 10.5C9.70924 10.5 9.55027 10.5615 9.43306 10.6709C9.31585 10.7803 9.25 10.9286 9.25 11.0833C9.25628 11.4881 9.35874 11.8866 9.55 12.25C9.76084 12.6316 10.0926 12.9432 10.5 13.1425V19.8333H12.375V16.9167H16.125V19.8333H18V15.0908C16.9097 15.0107 15.8858 14.5701 15.1125 13.8483Z"
        fill="white"
      />
      <path
        d="M34.56 9.216V16.152H34.928C35.0347 16.152 35.1227 16.1387 35.192 16.112C35.2667 16.08 35.344 16.0187 35.424 15.928L37.984 13.184C38.0587 13.0933 38.136 13.024 38.216 12.976C38.3013 12.9227 38.4133 12.896 38.552 12.896H39.84L36.856 16.072C36.712 16.2533 36.5573 16.3947 36.392 16.496C36.488 16.56 36.5733 16.6347 36.648 16.72C36.728 16.8 36.8027 16.8933 36.872 17L40.04 21H38.768C38.6453 21 38.5387 20.9813 38.448 20.944C38.3627 20.9013 38.288 20.8267 38.224 20.72L35.56 17.4C35.48 17.288 35.4 17.216 35.32 17.184C35.2453 17.1467 35.128 17.128 34.968 17.128H34.56V21H33.128V9.216H34.56Z"
        fill="#00B37E"
      />
      <path
        d="M44.7039 16.064C44.7039 15.7333 44.6559 15.432 44.5599 15.16C44.4692 14.8827 44.3332 14.6453 44.1519 14.448C43.9759 14.2453 43.7599 14.0907 43.5039 13.984C43.2479 13.872 42.9572 13.816 42.6319 13.816C41.9492 13.816 41.4079 14.016 41.0079 14.416C40.6132 14.8107 40.3679 15.36 40.2719 16.064H44.7039ZM45.8559 19.864C45.6799 20.0773 45.4692 20.264 45.2239 20.424C44.9785 20.5787 44.7145 20.7067 44.4319 20.808C44.1545 20.9093 43.8665 20.984 43.5679 21.032C43.2692 21.0853 42.9732 21.112 42.6799 21.112C42.1199 21.112 41.6025 21.0187 41.1279 20.832C40.6585 20.64 40.2505 20.3627 39.9039 20C39.5625 19.632 39.2959 19.1787 39.1039 18.64C38.9119 18.1013 38.8159 17.4827 38.8159 16.784C38.8159 16.2187 38.9012 15.6907 39.0719 15.2C39.2479 14.7093 39.4985 14.2853 39.8239 13.928C40.1492 13.5653 40.5465 13.2827 41.0159 13.08C41.4852 12.872 42.0132 12.768 42.5999 12.768C43.0852 12.768 43.5332 12.8507 43.9439 13.016C44.3599 13.176 44.7172 13.4107 45.0159 13.72C45.3199 14.024 45.5572 14.4027 45.7279 14.856C45.8985 15.304 45.9839 15.816 45.9839 16.392C45.9839 16.616 45.9599 16.7653 45.9119 16.84C45.8639 16.9147 45.7732 16.952 45.6399 16.952H40.2239C40.2399 17.464 40.3092 17.9093 40.4319 18.288C40.5599 18.6667 40.7359 18.984 40.9599 19.24C41.1839 19.4907 41.4505 19.68 41.7599 19.808C42.0692 19.9307 42.4159 19.992 42.7999 19.992C43.1572 19.992 43.4639 19.952 43.7199 19.872C43.9812 19.7867 44.2052 19.696 44.3919 19.6C44.5785 19.504 44.7332 19.416 44.8559 19.336C44.9839 19.2507 45.0932 19.208 45.1839 19.208C45.3012 19.208 45.3919 19.2533 45.4559 19.344L45.8559 19.864Z"
        fill="#00B37E"
      />
      <path
        d="M51.637 16.064C51.637 15.7333 51.589 15.432 51.493 15.16C51.4023 14.8827 51.2663 14.6453 51.085 14.448C50.909 14.2453 50.693 14.0907 50.437 13.984C50.181 13.872 49.8903 13.816 49.565 13.816C48.8823 13.816 48.341 14.016 47.941 14.416C47.5463 14.8107 47.301 15.36 47.205 16.064H51.637ZM52.789 19.864C52.613 20.0773 52.4023 20.264 52.157 20.424C51.9117 20.5787 51.6477 20.7067 51.365 20.808C51.0877 20.9093 50.7997 20.984 50.501 21.032C50.2023 21.0853 49.9063 21.112 49.613 21.112C49.053 21.112 48.5357 21.0187 48.061 20.832C47.5917 20.64 47.1837 20.3627 46.837 20C46.4957 19.632 46.229 19.1787 46.037 18.64C45.845 18.1013 45.749 17.4827 45.749 16.784C45.749 16.2187 45.8343 15.6907 46.005 15.2C46.181 14.7093 46.4317 14.2853 46.757 13.928C47.0823 13.5653 47.4797 13.2827 47.949 13.08C48.4183 12.872 48.9463 12.768 49.533 12.768C50.0183 12.768 50.4663 12.8507 50.877 13.016C51.293 13.176 51.6503 13.4107 51.949 13.72C52.253 14.024 52.4903 14.4027 52.661 14.856C52.8317 15.304 52.917 15.816 52.917 16.392C52.917 16.616 52.893 16.7653 52.845 16.84C52.797 16.9147 52.7063 16.952 52.573 16.952H47.157C47.173 17.464 47.2423 17.9093 47.365 18.288C47.493 18.6667 47.669 18.984 47.893 19.24C48.117 19.4907 48.3837 19.68 48.693 19.808C49.0023 19.9307 49.349 19.992 49.733 19.992C50.0903 19.992 50.397 19.952 50.653 19.872C50.9143 19.7867 51.1383 19.696 51.325 19.6C51.5117 19.504 51.6663 19.416 51.789 19.336C51.917 19.2507 52.0263 19.208 52.117 19.208C52.2343 19.208 52.325 19.2533 52.389 19.344L52.789 19.864Z"
        fill="#00B37E"
      />
      <path
        d="M54.5781 19.048C54.8395 19.4 55.1248 19.648 55.4341 19.792C55.7434 19.936 56.0901 20.008 56.4741 20.008C57.2315 20.008 57.8128 19.7387 58.2181 19.2C58.6234 18.6613 58.8261 17.8933 58.8261 16.896C58.8261 16.368 58.7781 15.9147 58.6821 15.536C58.5915 15.1573 58.4581 14.848 58.2821 14.608C58.1061 14.3627 57.8901 14.184 57.6341 14.072C57.3781 13.96 57.0875 13.904 56.7621 13.904C56.2981 13.904 55.8901 14.0107 55.5381 14.224C55.1914 14.4373 54.8715 14.7387 54.5781 15.128V19.048ZM54.5061 14.152C54.8475 13.7307 55.2421 13.392 55.6901 13.136C56.1381 12.88 56.6501 12.752 57.2261 12.752C57.6954 12.752 58.1195 12.8427 58.4981 13.024C58.8768 13.2 59.1994 13.464 59.4661 13.816C59.7328 14.1627 59.9381 14.5947 60.0821 15.112C60.2261 15.6293 60.2981 16.224 60.2981 16.896C60.2981 17.4933 60.2181 18.0507 60.0581 18.568C59.8981 19.08 59.6661 19.5253 59.3621 19.904C59.0634 20.2773 58.6954 20.5733 58.2581 20.792C57.8261 21.0053 57.3381 21.112 56.7941 21.112C56.2981 21.112 55.8714 21.0293 55.5141 20.864C55.1621 20.6933 54.8501 20.4587 54.5781 20.16V23.744H53.1461V12.896H54.0021C54.2048 12.896 54.3301 12.9947 54.3781 13.192L54.5061 14.152Z"
        fill="#00B37E"
      />
      <path
        d="M63.1686 21V12.896H64.0246C64.2273 12.896 64.3526 12.9947 64.4006 13.192L64.5046 14.024C64.8033 13.656 65.1393 13.3547 65.5126 13.12C65.8859 12.8853 66.3179 12.768 66.8086 12.768C67.3526 12.768 67.7926 12.92 68.1286 13.224C68.4699 13.528 68.7153 13.9387 68.8646 14.456C68.9819 14.1627 69.1313 13.9093 69.3126 13.696C69.4993 13.4827 69.7073 13.3067 69.9366 13.168C70.1659 13.0293 70.4086 12.928 70.6646 12.864C70.9259 12.8 71.1899 12.768 71.4566 12.768C71.8833 12.768 72.262 12.8373 72.5926 12.976C72.9286 13.1093 73.2113 13.3067 73.4406 13.568C73.6753 13.8293 73.8539 14.152 73.9766 14.536C74.0993 14.9147 74.1606 15.3493 74.1606 15.84V21H72.7286V15.84C72.7286 15.2053 72.5899 14.7253 72.3126 14.4C72.0353 14.0693 71.6353 13.904 71.1126 13.904C70.878 13.904 70.6539 13.9467 70.4406 14.032C70.2326 14.112 70.0486 14.232 69.8886 14.392C69.7286 14.552 69.6006 14.7547 69.5046 15C69.4139 15.24 69.3686 15.52 69.3686 15.84V21H67.9366V15.84C67.9366 15.1893 67.806 14.704 67.5446 14.384C67.2833 14.064 66.9019 13.904 66.4006 13.904C66.0486 13.904 65.7233 14 65.4246 14.192C65.1259 14.3787 64.8513 14.6347 64.6006 14.96V21H63.1686Z"
        fill="#00B37E"
      />
      <path
        d="M81.5937 12.896L77.0737 23.392C77.0257 23.4987 76.9644 23.584 76.8897 23.648C76.8204 23.712 76.7111 23.744 76.5617 23.744H75.5057L76.9857 20.528L73.6417 12.896H74.8737C74.9964 12.896 75.0924 12.928 75.1617 12.992C75.2364 13.0507 75.2871 13.1173 75.3137 13.192L77.4817 18.296C77.5671 18.52 77.6391 18.7547 77.6977 19C77.7724 18.7493 77.8524 18.512 77.9377 18.288L80.0417 13.192C80.0737 13.1067 80.1271 13.0373 80.2017 12.984C80.2817 12.9253 80.3697 12.896 80.4657 12.896H81.5937Z"
        fill="#00B37E"
      />
      <path
        d="M84.9469 19.048C85.2082 19.4 85.4935 19.648 85.8029 19.792C86.1122 19.936 86.4589 20.008 86.8429 20.008C87.6002 20.008 88.1815 19.7387 88.5869 19.2C88.9922 18.6613 89.1949 17.8933 89.1949 16.896C89.1949 16.368 89.1469 15.9147 89.0509 15.536C88.9602 15.1573 88.8269 14.848 88.6509 14.608C88.4749 14.3627 88.2589 14.184 88.0029 14.072C87.7469 13.96 87.4562 13.904 87.1309 13.904C86.6669 13.904 86.2589 14.0107 85.9069 14.224C85.5602 14.4373 85.2402 14.7387 84.9469 15.128V19.048ZM84.8749 14.152C85.2162 13.7307 85.6109 13.392 86.0589 13.136C86.5069 12.88 87.0189 12.752 87.5949 12.752C88.0642 12.752 88.4882 12.8427 88.8669 13.024C89.2455 13.2 89.5682 13.464 89.8349 13.816C90.1015 14.1627 90.3069 14.5947 90.4509 15.112C90.5949 15.6293 90.6669 16.224 90.6669 16.896C90.6669 17.4933 90.5869 18.0507 90.4269 18.568C90.2669 19.08 90.0349 19.5253 89.7309 19.904C89.4322 20.2773 89.0642 20.5733 88.6269 20.792C88.1949 21.0053 87.7069 21.112 87.1629 21.112C86.6669 21.112 86.2402 21.0293 85.8829 20.864C85.5309 20.6933 85.2189 20.4587 84.9469 20.16V23.744H83.5149V12.896H84.3709C84.5735 12.896 84.6989 12.9947 84.7469 13.192L84.8749 14.152Z"
        fill="#00B37E"
      />
      <path
        d="M96.3876 16.064C96.3876 15.7333 96.3396 15.432 96.2436 15.16C96.1529 14.8827 96.017 14.6453 95.8356 14.448C95.6596 14.2453 95.4436 14.0907 95.1876 13.984C94.9316 13.872 94.641 13.816 94.3156 13.816C93.633 13.816 93.0916 14.016 92.6916 14.416C92.2969 14.8107 92.0516 15.36 91.9556 16.064H96.3876ZM97.5396 19.864C97.3636 20.0773 97.1529 20.264 96.9076 20.424C96.6623 20.5787 96.3983 20.7067 96.1156 20.808C95.8383 20.9093 95.5503 20.984 95.2516 21.032C94.953 21.0853 94.657 21.112 94.3636 21.112C93.8036 21.112 93.2863 21.0187 92.8116 20.832C92.3423 20.64 91.9343 20.3627 91.5876 20C91.2463 19.632 90.9796 19.1787 90.7876 18.64C90.5956 18.1013 90.4996 17.4827 90.4996 16.784C90.4996 16.2187 90.5849 15.6907 90.7556 15.2C90.9316 14.7093 91.1823 14.2853 91.5076 13.928C91.8329 13.5653 92.2303 13.2827 92.6996 13.08C93.1689 12.872 93.6969 12.768 94.2836 12.768C94.7689 12.768 95.217 12.8507 95.6276 13.016C96.0436 13.176 96.4009 13.4107 96.6996 13.72C97.0036 14.024 97.2409 14.4027 97.4116 14.856C97.5823 15.304 97.6676 15.816 97.6676 16.392C97.6676 16.616 97.6436 16.7653 97.5956 16.84C97.5476 16.9147 97.4569 16.952 97.3236 16.952H91.9076C91.9236 17.464 91.9929 17.9093 92.1156 18.288C92.2436 18.6667 92.4196 18.984 92.6436 19.24C92.8676 19.4907 93.1343 19.68 93.4436 19.808C93.7529 19.9307 94.0996 19.992 94.4836 19.992C94.8409 19.992 95.1476 19.952 95.4036 19.872C95.6649 19.7867 95.8889 19.696 96.0756 19.6C96.2623 19.504 96.4169 19.416 96.5396 19.336C96.6676 19.2507 96.7769 19.208 96.8676 19.208C96.9849 19.208 97.0756 19.2533 97.1396 19.344L97.5396 19.864Z"
        fill="#00B37E"
      />
      <path
        d="M100.322 21.128C99.6822 21.128 99.1889 20.9493 98.8422 20.592C98.5009 20.2347 98.3302 19.72 98.3302 19.048V14.088H97.3542C97.2689 14.088 97.1969 14.064 97.1382 14.016C97.0796 13.9627 97.0502 13.8827 97.0502 13.776V13.208L98.3782 13.04L98.7062 10.536C98.7222 10.456 98.7569 10.392 98.8102 10.344C98.8689 10.2907 98.9436 10.264 99.0342 10.264H99.7542V13.056H102.098V14.088H99.7542V18.952C99.7542 19.2933 99.8369 19.5467 100.002 19.712C100.168 19.8773 100.381 19.96 100.642 19.96C100.792 19.96 100.92 19.9413 101.026 19.904C101.138 19.8613 101.234 19.816 101.314 19.768C101.394 19.72 101.461 19.6773 101.514 19.64C101.573 19.5973 101.624 19.576 101.666 19.576C101.741 19.576 101.808 19.6213 101.866 19.712L102.282 20.392C102.037 20.6213 101.741 20.8027 101.394 20.936C101.048 21.064 100.69 21.128 100.322 21.128Z"
        fill="#00B37E"
      />
    </svg>
  );
}
