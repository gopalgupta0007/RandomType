const reportWebVitals = onPerfEntry => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);   // CLS(cumulative Layout shift) tells that how much time the application are going to refresh
      getFID(onPerfEntry);   // FID(first inout deplay/ touch) user click time => it's tells that how much time it will take to get the response while occuring some events
      getFCP(onPerfEntry);   // FCP(First Contentful paint)
      getLCP(onPerfEntry);   // LCP()
      getTTFB(onPerfEntry);  // TTFB(time to first byte)
    });
  }
};

export default reportWebVitals;
