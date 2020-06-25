import React, {
  useCallback,
  FunctionComponent,
  useState,
  useEffect,
} from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import {
  Droppable,
  DragDropContext,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import { connect, ConnectedProps, useDispatch } from 'react-redux';
import SavedEmpty from './SavedEmpty';
import { RootState } from '../store';
import {
  rehydrateSavedFacilities,
  moveSavedFacility,
} from '../store/facilities/actions';
import { saveFacilityOrder, Facility } from '../services/facilities';
import FacilityCard from './FacilityCard';

const mapStateToProps = (state: RootState) => {
  const { saved, byId, isFetching } = state.facilities;

  const savedList: Partial<Facility>[] = [];
  saved.forEach((id) => {
    if (byId[id]) {
      savedList.push(byId[id]);
    }
  });

  return {
    savedList,
    isFetching,
    saved,
  };
};

const connector = connect(mapStateToProps);
type ReduxProps = ConnectedProps<typeof connector>;
type SavedAreaProps = ReduxProps;

const styles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.droppable.default,
  },
  savedCardGrid: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(0.5),
    paddingTop: theme.spacing(0.5),
    minHeight: 0,
  },
  statusBanner: {
    position: 'relative',
    left: 0,
    top: 0,
    bottom: 0,
    width: 20,
    backgroundColor: 'blue',
  },
  gridItem: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(0.5),
  },
}));

const SavedArea: FunctionComponent<SavedAreaProps> = (props) => {
  const [isHydrated, setIsHydrated] = useState<boolean>(false);
  const classes = styles();
  const { saved, savedList, isFetching } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(rehydrateSavedFacilities());
    setIsHydrated(true);
  }, [dispatch]);

  useEffect(() => {
    if (isHydrated) {
      saveFacilityOrder(saved);
    }
  }, [saved, isHydrated]);

  const onDragEnd = useCallback(
    (result: DropResult) => {
      if (!result.destination) {
        return;
      }

      dispatch(
        moveSavedFacility(result.source.index, result.destination.index),
      );
    },
    [dispatch],
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="saved">
        {(provided) => (
          <Paper
            className={classes.savedCardGrid}
            ref={provided.innerRef}
            classes={{ root: classes.paper }}
            elevation={0}
            {...provided.droppableProps}
          >
            {savedList.length <= 0 && isHydrated && !isFetching ? (
              <SavedEmpty />
            ) : null}
            {savedList.map((facility, i) => (
              <Draggable
                key={facility.id}
                draggableId={facility.id || i.toString()}
                index={i}
              >
                {(provided, snap) => (
                  <div
                    className={classes.gridItem}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <FacilityCard
                      isDragging={snap.isDragging}
                      id={facility.id || 'abc'}
                    />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </Paper>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default connector(SavedArea);
