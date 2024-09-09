export type RecordAny = Record<string, any>;

/**
 * @returns boolean: indicating success / failure.
 * (success = true, failure = false)
 */
export type ChangeFn<B, Q> = (b?: B, q?: Q) => Promise<boolean>;
export type ChangeFnQ<Q> = (q?: Q) => Promise<boolean>;

/**
 * T = Type of entity;<br>
 * UQ = Type of update query;<br>
 * UB = Type of update query;<br>
 * PQ = Type of post query;<br>
 * PB = Type of post query;<br>
 * DQ = Type of delete query;<br>
 */
export type LookupRepository<
  T,
  UQ extends RecordAny = RecordAny,
  UB extends RecordAny = RecordAny,
  PQ extends RecordAny = RecordAny,
  PB extends RecordAny = RecordAny,
  DQ extends RecordAny = RecordAny,
> = {
  data: Ref<T>;
  setData: (data: T) => void;

  updateData: ChangeFn<UQ, UB>;
  postData: ChangeFn<PQ, PB>;
  deleteData: ChangeFnQ<DQ>;

  fetching: Ref<boolean>;
  changing: Ref<boolean>;
  refresh: () => Promise<void>;
};

/**
 * T = Type of entity;<br>
 * FQ = Type of fetch query;<br>
 */
export type LookupRepositoryOptions<T, FQ extends RecordAny = RecordAny> = {
  key: string;
  fetchURL: string;
  fetchQuery?: FQ;
  postURL?: string;
  updateURL?: string;
  deleteURL?: string;
  initFn?: () => T;
  immediate?: boolean;
};

/**
 * T = Type of entity;<br>
 * UQ = Type of update query;<br>
 * UB = Type of update query;<br>
 * PQ = Type of post query;<br>
 * PB = Type of post query;<br>
 * DQ = Type of delete query;<br>
 */
export async function useObjectRepository<
  T,
  FQ extends RecordAny = RecordAny,
  UB extends RecordAny = RecordAny,
  UQ extends RecordAny = RecordAny,
  PB extends RecordAny = RecordAny,
  PQ extends RecordAny = RecordAny,
  DQ extends RecordAny = RecordAny,
>(options: LookupRepositoryOptions<T, FQ>): Promise<LookupRepository<T, UB, UQ, PB, PQ, DQ>> {
  const immediate = typeof options.immediate === 'undefined' ? true : options.immediate;
  const { data, setData, firstFetched, fetching, changing } = useObjectState(options.key, options.initFn);

  const {
    data: fetchData,
    execute: fetchExecute,
    refresh: fetchRefresh,
  } = useFetch<T>(options.fetchURL, {
    query: options.fetchQuery,
    immediate: false,
  });

  const setFetchData = () => {
    setData(fetchData.value as T);
  };

  const refresh = async () => {
    await fetchRefresh();
    setFetchData();
  };

  if (!firstFetched.value && immediate) {
    firstFetched.value = true;
    await fetchExecute();
    setFetchData();
  }

  const updateData: ChangeFn<UB, UQ> = makeChangeFn('put', changing, options.key, refresh, options.updateURL);

  const postData: ChangeFn<PB, PQ> = makeChangeFn('post', changing, options.key, refresh, options.postURL);

  const deleteData: ChangeFnQ<DQ> = makeChangeFnQ('delete', changing, options.key, refresh, options.deleteURL);

  return {
    data,
    setData,

    updateData,
    postData,
    deleteData,

    fetching,
    refresh,
    changing,
  };
}

function makeChangeFnQ<Q extends RecordAny = RecordAny>(
  method: 'put' | 'post' | 'delete',
  changing: Ref<boolean>,
  key: string,
  refresh: () => Promise<void>,
  url?: string
): ChangeFnQ<Q> {
  const fn = makeChangeFn<any, Q>(method, changing, key, refresh, url);
  return (q) => {
    return fn(undefined, q);
  };
}

function makeChangeFn<B extends RecordAny = RecordAny, Q extends RecordAny = RecordAny>(
  method: 'put' | 'post' | 'delete',
  changing: Ref<boolean>,
  key: string,
  refresh: () => Promise<void>,
  url?: string
): ChangeFn<B, Q> {
  return async (b?: B, q?: Q) => {
    if (!url) throw new Error('Change function: URL not provided. Key: ' + key);
    if (changing.value) {
      console.warn('Performing simultaneous operations on', key);
    }
    try {
      changing.value = true;
      await $fetch(url, {
        method,
        query: q,
        body: b,
      });
      await refresh();
      return true;
    } catch (e) {
      console.error('Error updating ' + key, e);
      return false;
    } finally {
      changing.value = false;
    }
  };
}
