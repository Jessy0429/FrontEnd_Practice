function quickSort(nums, low, high){
    function partition(nums, low, high){
        let k = low
        let pivot = nums[low]
        for (let i = low; i <=high; i++){
            if (nums[i] < pivot){
                let temp = nums[k];
                nums[k] = nums[i];
                nums[i] = temp;
                k++;
            }
            else{
                // let temp = nums[k+1];
                // nums[k+1] = nums[high];
                // nums[high] = temp;

            }

        }
        return k
    }
    if(low <= high){
        let p = partition(nums, low, high)
        quickSort(nums, low, p-1)
        quickSort(nums, p+1, high)
    }
}

let nums = [0,1,2,3,4,5,7,6,4]
quickSort(nums, 0, nums.length-1)
console.log(nums)