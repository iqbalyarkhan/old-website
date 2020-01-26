---
date: 2020-01-25
title: Practice Notes
draft: false
extract: Notes as I solve various practice problems
categories: 
    - C++
tags:
    - C++
---
## Table of Contents

- [Reading whitespace separated numbers](#reading-numbers-separated-by-whitespace)

### Reading numbers separated by whitespace

Say input is:

```css
3 // Number of entries about to follow
5 -10 15 // Each entry
```
This input can be read by using `cin`. Subsequently, you can then loop number of times read and then use `cin` which reads each new number in succession. `cin` reads based on whitespace or new-line. 

```cpp
int main(int argc, const char * argv[]) {
    int num = 0;
    cin >> num;
    int ans = 0;
    for (int i = 0; i < num; i++){
        int curr = 0;
        cin >> curr;
        if (curr < 0){
            ans++;
        }
    }
    
    cout << ans << endl;
    
    return 0;
}
```