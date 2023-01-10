import React from "react";

import { redirect } from "react-router-dom";

class ErrorBoundary extends React.Component<{children:any}, {error:boolean}, any> {
  constructor(props:any) {
    super(props);
    this.goBackToHome = this.goBackToHome.bind(this);
    this.state = {
      error: false,
    };
  }
  static getDerivedStateFromError() {
    return { error: true };
  }
  componentDidCatch(_:any, errorMessage:any) {
    console.log(errorMessage);
  }
  goBackToHome() {
    this.setState({error:false})
    window.location.replace(window.location.origin);
  }

  render() {
    document.title = "error";
  
    return this.state.error? (
      <section className="h-[100vh] w-full bg-[#000] flex items-center justify-center ">
        <div className="flex flex-col items-center justify-center">
          <p className="text-nunito text-white text-[18px]">An error occurred. Go back to home page</p>
          <button onClick={this.goBackToHome} className='text-[22px] bg-[#fff4] p-3 rounded-full text-[#00aceee] text-center'>Home</button>
        </div>
      </section>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;