return {
    rawget = function(t, k)
        return t[k]
    end,
    rawset = function(t, k, v)
        t[k] = v;
    end
}