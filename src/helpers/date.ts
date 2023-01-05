


export function minimalDistance(d:string){
  const arr = d.split(' ')
  let holder = ''
  for(let i=0;i<arr.length;i++){
    if(Number(arr[i])){
      holder+=arr[i]+`${arr[i+1][0]}`
      break
    }
  }
  return holder
}