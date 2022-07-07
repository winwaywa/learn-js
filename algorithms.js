function swap(arr, i, j) {
    //dùng destructuring
    // [arr[a], arr[b]] = [arr[b], arr[a]];

    // hoặc dùng biến tạm
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

// --------- Sắp xếp nổi bọt -------------
// Ý tưởng là sẽ so sánh 2 phần tử liền kề, hoán đổi vị trí cho phù hợp
// Tình huống tốt nhất: độ phức tạp = O(N) (đi qua đúng n phần tử)
// Tình huống xấu nhất: độ phức tạp = O(N^2) (đi qua n mũ 2 phần tử)
function bubbleSort(arr) {
    // chạy n lần
    for (let i = 0; i < arr.length - 1; i++) {
        // chạy từ j = 0 đến n - i lần
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr, j, j + 1);
            }
        }
        console.log("i=" + i, arr);
    }
    return arr;
}

// --------- Sắp xếp chọn -------------
// Ý tưởng của thuật toán là tìm ra giá trị nhỏ nhất trong đám, rồi đưa nó về vị trí đầu tiên, lặp lại cho các phần tử kế tiếp.
// Độ phức tạp: O(n^2)
function selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        // Gán minIndex bằng i;
        let minIndex = i;

        //Duyệt các phần tử sau còn lại, xem index nào có giá trị nhỏ hơn giá trị minIndex thì gán minIndex cho index đó.
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[minIndex] > arr[j]) {
                minIndex = j;
            }
        }

        // Nếu minIndex thay đổi
        if (minIndex != i) {
            swap(arr, i, minIndex);
        }

        console.log("i=" + i, arr);
    }
    return arr;
}

// --------- Sắp xếp nhanh -------------
// Đây là thuật toán được sử dụng nhiều nhất, phương pháp chia để trị
// Tình huống tốt nhất: độ phức tạp = O(N Log N)
// Tình huống xấu nhất: độ phức tạp = O(N^2)
const quickSort = (arr) => {
    if (arr.length < 2) return arr;
    //Lấy phần tử cuối làm pivot
    const pivotIndex = arr.length - 1;
    const pivot = arr[pivotIndex];
    const left = [];
    const right = [];

    //Duyệt qua arr, giá trị nào lớn hơn pivot thì chuyển qua mảng right và ngược lại thì left
    let currentValue;
    for (let i = 0; i < pivotIndex; i++) {
        currentValue = arr[i];
        if (currentValue < pivot) {
            left.push(currentValue);
        } else {
            right.push(currentValue);
        }
    }

    return [...quickSort(left), pivot, ...quickSort(right)];
};

console.log("--------- Sắp xếp nổi bọt -------------");
bubbleSort([1, 4, 2, 5, 1]);
console.log("--------- Sắp xếp chọn -------------");
selectionSort([1, 4, 2, 5, 1]);
console.log("--------- Sắp xếp nhanh -------------");
console.log(quickSort([1, 4, 2, 5, 1]));

// --------- Tìm kiếm tuyến tính -------------
// O(n)
function linearSearch(arr, seekElement) {
    const output = [];
    arr.forEach((el, index) => el === seekElement && output.push(index));
    return output;
}

// --------- Tìm kiếm nhị phân -------------
// Tìm kiếm áp dụng với mảng đã sắp xếp
function binarySearch(arr, left, right, seekElement) {
    if (right >= left) {
        const mid = left + Math.floor((right - left) / 2);
        console.log("mid:", mid);

        if (arr[mid] === seekElement) return mid;
        if (arr[mid] > seekElement)
            return binarySearch(arr, left, mid - 1, seekElement);
        if (arr[mid] < seekElement)
            return binarySearch(arr, mid + 1, right, seekElement);
    }

    return -1;
}

console.log("--------- Tìm kiếm tuyến tính -------------");
arr = quickSort([1, 4, 2, 5, 1]);
console.log("Mảng arr đã sắp xếp:", arr);
console.log(linearSearch(arr, 5));
console.log("--------- Tìm kiếm nhị phân -------------");
console.log("Vị trí index tìm được:", binarySearch(arr, 0, arr.length - 1, 5));
