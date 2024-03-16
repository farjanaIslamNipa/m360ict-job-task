const NoTaskFound = () => {
  return (
    <div>
      <p
        style={{
          textAlign: "center",
          paddingTop: "20px",
          fontSize: "20px",
          color: "gray",
          fontWeight: "500",
        }}
      >
        Task list is empty
      </p>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: "0.5",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="300px"
          height="300px"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M15 18.5L20 13.5M20 18.5L15 13.5"
            stroke="#1C274C"
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            opacity="0.5"
            d="M21 6L3 6"
            stroke="#1C274C"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <path
            opacity="0.5"
            d="M21 10L3 10"
            stroke="#1C274C"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <path
            opacity="0.5"
            d="M11 14L3 14"
            stroke="#1C274C"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
          <path
            opacity="0.5"
            d="M11 18H3"
            stroke="#1C274C"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default NoTaskFound;
